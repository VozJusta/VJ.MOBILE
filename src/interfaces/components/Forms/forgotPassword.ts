import { ReactNode } from "react";
import { PasswordStrengthSection } from "../PasswordStrengh";

export interface ICodeForgotPasswordProps {
  resolvedCodeDescription: string;
  resolvedCodeTitle: string;
  resolvedVerifyButtonLabel: string;
  timerLabel: string;
  emailValidateScreen: string;
  onCodeVerified: () => void;
}

export interface IUpdateForgotPasswordProps {
  passwordStrength: PasswordStrengthSection;
  labelButton?: ReactNode;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onSubmit: () => void;
}
