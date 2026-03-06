import { MaterialIcons } from "@expo/vector-icons";
import { TextInputProps } from "react-native";

export interface IInputProps {
  label?: string;
  placeholder: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  rightIconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  iconSize: number;
  iconNameProps: React.ComponentProps<typeof MaterialIcons>["name"];
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;
  value?: string;
  type: "text" | "password" | "email" | "phone" | "cpf" | "name";
  onChangeText?: (text: string) => void;
  onRightIconPress?: () => void;
  iconColor?: string;
  inputOTP?: boolean
}