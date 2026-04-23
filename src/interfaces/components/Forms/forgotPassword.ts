import { ReactNode } from "react";
import { IPasswordStrength } from "../PasswordStrengh";

export interface ICodeForgotPassword {
  resolvedCodeDescription: string;
  resolvedCodeTitle: string;
  resolvedVerifyButtonLabel: string;
  timerLabel: string;
  emailValidateScreen: string;
  onCodeVerified: () => void;
}

export interface IUpdateForgotPassword {
  passwordStrength: IPasswordStrength;
  labelButton?: ReactNode;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onSubmit: () => void;
}
