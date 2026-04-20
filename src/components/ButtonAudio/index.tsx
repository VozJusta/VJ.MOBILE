import { IButtonAudio } from "@/interfaces/components/ButtonAudio";
import { View, TouchableOpacity, Text } from "react-native";

export default function ButtonAudio(props: IButtonAudio) {
  return (
    <View className="flex items-center justify-center p-2">
      <TouchableOpacity
        onPress={
          props.isRecording ? props.onStopRecording : props.onStartRecording
        }
        disabled={props.disabled}
        className={`flex min-w-[150px] items-center justify-center rounded-full px-5 py-3 shadow-sm ${
          props.disabled
            ? "bg-slate-400"
            : props.isRecording
              ? "bg-red-500"
              : "bg-blue-600"
        }`}
      >
        <Text className="text-base font-bold text-white">
          {props.isRecording ? "Parar Gravação" : "Gravar Áudio"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
