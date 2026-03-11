import { PasswordStrengthSection } from "./components/PasswordStrengh";


export type IForgotPasswordProps =
  | {
      screen: ScreensForgotPassword.Email | ScreensForgotPassword.Code;
    }
  | {
      screen: ScreensForgotPassword.Update;
      passwordStrength: PasswordStrengthSection;
      newPassword: string;
      setNewPassword: (password: string) => void;
      confirmPassword: string;
      setConfirmPassword: (password: string) => void;
    };

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
