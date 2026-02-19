export interface ButtonProps {
    children?: React.ReactNode;
    height: string;
    goNext?: boolean;
    onPress: () => void

}

 export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}