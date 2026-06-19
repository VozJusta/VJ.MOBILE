export interface IButtonOption {
  handleSendFile: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  loading: boolean;
  positionsInput: "textArea" | "input";
  modalVisible?: () => void;
}
