import type { ReactNode } from "react";
import type MaterialIcons from "@expo/vector-icons/MaterialIcons";
export interface ButtonProps {
  children?: ReactNode;
  goNext?: boolean;
  goBack?: boolean;
  bg?: string;
  active?: boolean;
  onPress: () => void;
  gradient: boolean;
  size?: string;
  hover: boolean;
}

export interface InputProps {
  placeholder: string;
  icon: boolean;
  iconSize: number;
  iconNameProps: React.ComponentProps<typeof MaterialIcons>["name"];
  height: string;
}

export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}
