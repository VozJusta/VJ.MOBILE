import { PasswordStrengthSection } from "./template/SignInTemplate";

export interface ForgotPasswordProps {
  screen: ScreensForgotPassword
  passwordStrength?: PasswordStrengthSection;
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
  onValueChange: (value: string) => void;
}


export interface CareerSelectProps {
  label: string;
  values: string[];
  options: string[];
  onValuesChange: (values: string[]) => void;
}

export interface CareerSelectProps {
  label: string;
  values: string[];
  options: string[];
  onValuesChange: (values: string[]) => void;
}