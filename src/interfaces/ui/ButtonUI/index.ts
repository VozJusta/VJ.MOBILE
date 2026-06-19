import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

export interface IButton {
  children?: ReactNode;
  onPress: (e?: any) => void;
  goNext?: boolean;
  goBack?: boolean;
  gradient?: boolean;
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
  size?: string;
  bg?: string;
  border?: string;
  iconLeft?: boolean;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  paddingButtonStatus?: string;
  onLongPress?: () => void;
  delayLongPress?: number;
}