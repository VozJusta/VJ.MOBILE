import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

export interface IButtonProps {
  children?: ReactNode;
  goNext?: boolean;
  goBack?: boolean;
  bg?: string;
  active?: boolean;
  onPress: () => void;
  gradient: boolean;
  size?: string;
  hover: boolean;
  shadow?: string;
}