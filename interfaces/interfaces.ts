import { PasswordStrengthSection } from "./components/PasswordStrengh";

type CodeScreenOptions = {
  codeTitle?: string;
  codeDescription?: string;
  verifyButtonLabel?: string;
  codeBackRoute?: string;
  onCodeVerified?: () => void;
};

export type IForgotPasswordProps =
  | ({
      screen: ScreensForgotPassword.Email | ScreensForgotPassword.Code;
    } & CodeScreenOptions)
  | ({
      screen: ScreensForgotPassword.Update;
      passwordStrength: PasswordStrengthSection;
      newPassword: string;
      setNewPassword: (password: string) => void;
      confirmPassword: string;
      setConfirmPassword: (password: string) => void;
    } & CodeScreenOptions);

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
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
}
