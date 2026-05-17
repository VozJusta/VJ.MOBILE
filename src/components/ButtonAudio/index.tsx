import { IButtonAudio } from "@/interfaces/components/ButtonAudio";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ButtonAudio(props: IButtonAudio) {
  const handlePress = () => {
    if (props.disabled) return;

    if (props.isRecording) {
      props.onStopRecording();
      return;
    }

    props.onStartRecording();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={props.disabled}
      accessibilityState={{ disabled: props.disabled }}
      className={`flex h-16 w-16 items-center justify-center rounded-full shadow-sm ${
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
