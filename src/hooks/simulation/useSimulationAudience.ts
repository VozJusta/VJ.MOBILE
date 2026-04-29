import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { transcribeAudio } from "@/services/ai/conversation/transcribeAudio";
import { useWebSocketSimulation } from "@/store/simulation/websocket";
import { useRecordAudio } from "@/hooks/shared/audio/useRecordAudio";
import * as FileSystem from "expo-file-system/legacy";
import { Audio } from "expo-av";

export function useSimulationAudience() {
  const router = useRouter();
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

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
    simulationReportId
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

    let sound: Audio.Sound | null = null;

    const playAudio = async () => {
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(audioFile);
        });

        const fileUri = FileSystem.cacheDirectory + "ai_response.mp3";
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: true },
        );
        sound = audioSound;
      } catch (e) {
        console.error(e);
        Toast.show({
          type: "error",
          text1: "Erro ao reproduzir áudio",
        });
      }
    };

    playAudio();

    return () => {
      sound?.unloadAsync();
    };
  }, [audioFile]);

  useEffect(() => {
    if (!warning) return;

    Toast.show({
      type: "info",
      text1: warning.message,
      text2: `Tempo restante: ${warning.remainingSecs}s`,
    });
  }, [warning]);

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
    simulationReportId
  };
}
