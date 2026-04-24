import { IButtonAudio } from "@/interfaces/components/ButtonAudio";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ButtonAudio(props: IButtonAudio) {
  return (
    <TouchableOpacity
      onPress={
        props.isRecording ? props.onStopRecording : props.onStartRecording
      }
      disabled={props.disabled}
      className={`flex h-12 w-12 items-center justify-center rounded-full shadow-sm ${
        props.disabled
          ? "bg-slate-400"
          : props.isRecording
            ? "bg-[#EF4444]"
            : "bg-[#2563EB]"
      }`}
    >
      <MaterialIcons
        name={props.isRecording ? "stop" : "mic"}
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
}
