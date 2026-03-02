import { TextInput, View, Text } from "react-native";
import { InputProps } from "../../interfaces/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function InputUI({ icon = false, ...props }: InputProps) {
  return icon ? (
    <View className={`w-full gap-[13px] ${props.height} px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row items-center`}>
      <MaterialIcons
        name={props.iconNameProps}
        size={props.iconSize}
        color={"#64748B"}
      />
      <TextInput
        className="w-[80%] h-full  bg-transparent"
        placeholderTextColor={"#475569"}
        placeholder={`${props.placeholder}`}
      />
    </View>
  ) : (
    <View></View>
  );
}
