import { PasswordStrengthSection } from "../PasswordStrengh";

export interface ICodeForgotPasswordProps {
  resolvedCodeDescription: string;
  resolvedCodeTitle: string;
  resolvedVerifyButtonLabel: string;
  timerLabel: string;
  emailValidateScreen: string;
}

export interface IUpdateForgotPasswordProps {
  passwordStrength: PasswordStrengthSection;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
}
