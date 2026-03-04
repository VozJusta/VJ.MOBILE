import { MaterialIcons } from "@expo/vector-icons";
import { TextInputProps } from "react-native";

export interface IInputProps {
  placeholder: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  iconSize: number;
  iconNameProps: React.ComponentProps<typeof MaterialIcons>["name"];
  keyboardType?: TextInputProps["keyboardType"];
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  iconColor?: string;
}