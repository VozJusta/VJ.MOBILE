export interface ButtonProps {
    children: React.ReactNode;
}

 export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}