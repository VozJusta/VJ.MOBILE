export interface ButtonProps {
  children?: React.ReactNode;
  height: string;
  goNext?: boolean;
  bg?: string;
  active?: boolean;
  onPress: () => void;
  gradient: boolean;
}

export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}
