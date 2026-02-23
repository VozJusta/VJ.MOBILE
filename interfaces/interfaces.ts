import type { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
export interface ButtonProps {
  children?: React.ReactNode;
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
  type?: "name" | "cpf" | "phone" | "email" | "password";
} 