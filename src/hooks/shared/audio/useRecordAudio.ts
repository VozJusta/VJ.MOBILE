import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import Toast from "react-native-toast-message";

interface IUseRecordAudio {
  onRecordingComplete: (uri: string) => Promise<void>;
}

export function useRecordAudio({ onRecordingComplete }: IUseRecordAudio) {
  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });

  const audioRecorderState = useAudioRecorderState(audioRecorder);
  const meteringVoice = audioRecorderState.metering || -160;
  const recordingDuration = audioRecorderState.durationMillis || 0;
  const isRecording = audioRecorderState.isRecording;

  const handleStartRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Permissão de gravação negada",
          text2: "Por favor, permita o acesso ao microfone",
        });
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao iniciar gravação",
      });
    }
  };

  const handleStopRecording = async () => {
    try {
      await audioRecorder.stop();

      const uri = audioRecorder.uri;

      if (!uri) {
        Toast.show({
          type: "error",
          text1: "Erro ao obter gravação",
        });
        return;
      }

      await onRecordingComplete(uri);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao parar gravação",
      });
    }
  };

  return {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    meteringVoice,
    recordingDuration,
  };
}
