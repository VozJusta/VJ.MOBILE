import { useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { transcribeAudio } from "@/services/ai/conversation/transcribeAudio";
import { useWebSocketSimulation } from "@/store/simulation/websocket";
import { useRecordAudio } from "@/hooks/shared/audio/useRecordAudio";

export function useSimulationAudience() {
  const router = useRouter();

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
  } = useWebSocketSimulation();

  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    meteringVoice,
    recordingDuration,
  } = useRecordAudio({
    onRecordingComplete: async (uri) => {
      const response = await transcribeAudio(uri);

      if (!response.success || !response.data) {
        Toast.show({
          type: "error",
          text1: response.fields?.[0] ?? "Erro ao transcrever áudio",
        });
        return;
      }

      await sendChat(response.data);
    },
  });

  useEffect(() => {
    if (!audioFile) return;

    const playAudio = async () => {
      try {
        const uri = URL.createObjectURL(audioFile);
        const { useAudioPlayer } = await import("expo-audio");
        const player = useAudioPlayer(uri);
        player.play();
      } catch {
        Toast.show({
          type: "error",
          text1: "Erro ao reproduzir áudio",
        });
      }
    };

    playAudio();
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

  useEffect(() => {
    if (simulationStatus === "Completed" || simulationStatus === "TimedOut") {
      router.push("/screens/citizen/simulation/report");
    }
  }, [simulationStatus]);

  const handleStop = () => {
    stopSimulation();
  };

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
  };
}
