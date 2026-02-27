import type { ReactNode } from "react";

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

export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}
