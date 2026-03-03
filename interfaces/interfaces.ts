import type { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
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
  shadow?: string;
}

export interface IdScreen{
  screen: ScreensForgotPassword
}

export enum ScreensForgotPassword {
  Email = "EMAIL",
  Code = "CODE",
  Update = "UPDATE",
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


export interface AppInputProps extends TextInputProps {
  label: string;
  type?: "name" | "cpf" | "phone" | "email" | "password" | "OAB";
  rightIcon?: ReactNode;
} 

export interface UfSelectProps {
  label: String;
  value: String;
  onValueChange: (value: String) => void;
}

