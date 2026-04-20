export interface IButtonAudio {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  disabled?: boolean;
}