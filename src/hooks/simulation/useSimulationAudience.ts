import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { transcribeAudio } from "@/services/ai/conversation/transcribeAudio";
import { useWebSocketSimulation } from "@/store/simulation/websocket/simulation";
import { useRecordAudio } from "@/hooks/shared/audio/useRecordAudio";
import { Audio } from "expo-av";

export function useSimulationAudience() {
  const router = useRouter();
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [remainingSecs, setRemainingSecs] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const {
    sendChat,
    stopSimulation,
    simulationStatus,
    isSpeaking,
    warning,
    aiResponse,
    audioFile,
    isLoading,
    error,
    clearSimulation,
    clearMessages,
    simulationReportId,
    videoUrl,
  } = useWebSocketSimulation();

  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    meteringVoice,
    recordingDuration,
  } = useRecordAudio({
    onRecordingComplete: async (uri) => {
      setTranscribedText(null);
      clearMessages();

      setIsTranscribing(true);
      try {
        const response = await transcribeAudio(uri);
        if (!response.success || !response.data) {
          Toast.show({
            type: "error",
            text1: response.fields?.[0] ?? "Erro ao transcrever áudio",
          });
          return;
        }
        setTranscribedText(response.data);
        await sendChat(response.data);
      } finally {
        setIsTranscribing(false);
      }
    },
  });

  useEffect(() => {
    if (!audioFile) return;

    const playAudio = async () => {
      try {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioFile },
          { shouldPlay: true },
        );
        soundRef.current = sound;
        setIsPaused(false);
      } catch (e) {
        Toast.show({ type: "error", text1: "Erro ao reproduzir áudio" });
      }
    };

    playAudio();

    return () => {
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, [audioFile]);

  const handlePauseAudio = async () => {
    if (!soundRef.current) return;

    if (isPaused) {
      await soundRef.current.playAsync();
      setIsPaused(false);
    } else {
      await soundRef.current.pauseAsync();
      setIsPaused(true);
    }
  };


  

  useEffect(() => {
    if (!warning) return;

    setRemainingSecs(warning.remainingSecs);

    Toast.show({
      type: "info",
      text1: warning.message,
      text2: `Tempo restante: ${warning.remainingSecs}s`,
    });
  }, [warning]);

  useEffect(() => {
    if (remainingSecs === null || remainingSecs <= 0) return;

    const interval = setInterval(() => {
      setRemainingSecs((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSecs]);

  useEffect(() => {
    if (simulationStatus === "Completed" || simulationStatus === "TimedOut") {
      setRemainingSecs(null);
    }
  }, [simulationStatus]);

  useEffect(() => {
    if (!error) return;

    Toast.show({
      type: "error",
      text1: error,
    });
  }, [error]);

  const handleStop = () => {
    stopSimulation();
  };

  useEffect(() => {
    return () => {
      setTranscribedText(null);
      clearSimulation();
    };
  }, []);

  return {
    handleStartRecording,
    handleStopRecording,
    handleStop,
    isRecording,
    meteringVoice,
    recordingDuration,
    simulationStatus,
    isSpeaking,
    aiResponse,
    isLoading,
    transcribedText,
    isTranscribing,
    simulationReportId,
    remainingSecs,
    videoUrl,
    handlePauseAudio,
    isPaused,
  };
}
