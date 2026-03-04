import { TextInput, View } from "react-native";
import { InputProps } from "../../interfaces/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Input({ ...props }: InputProps) {
  return (
    <View
      className={`w-full gap-[13px] ${props.height} px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row items-center`}
    >
      {props.leftIcon && (
        <MaterialIcons
          name={props.iconNameProps}
          size={props.iconSize}
          color={"#64748B"}
        />
      )}

      <TextInput
        className="w-[80%] h-full  bg-transparent"
        placeholderTextColor={"#475569"}
        {...props}
      />


      {props.rightIcon && (
        <MaterialIcons
        className="absolute right-0 left-4"
          name={props.iconNameProps}
          size={props.iconSize}
          color={props.iconColor}
        />
      )}
    </View>
  );
}
