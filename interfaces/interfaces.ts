import type { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
export interface ButtonProps {
  children?: ReactNode;
  goNext?: boolean;
  bg?: string;
  active?: boolean;
  onPress: () => void;
  gradient: boolean;
  size?: string;
  hover:boolean;
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

