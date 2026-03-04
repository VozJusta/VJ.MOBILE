export interface IdScreen {
  screen: ScreensForgotPassword
}

export enum ScreensForgotPassword {
  Email = "EMAIL",
  Code = "CODE",
  Update = "UPDATE",
}

export interface OnboardingRef {
  goNext: () => void;
  goToPage: (pageIndex: number, animated?: boolean) => void;
}

export interface UfSelectProps {
  label: string;
  value: string;
  style?: Object;
  onValueChange: (value: String) => void;
}


export interface CareerSelectProps {
  label: String;
  value: String;
  onValueChange: (value: String) => void;
}
