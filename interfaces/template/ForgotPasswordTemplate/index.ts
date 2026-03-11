import { PasswordStrengthSection } from "../../components/PasswordStrengh";

export enum ScreensForgotPassword {
  Email = "EMAIL",
  Code = "CODE",
  Update = "UPDATE",
}

export interface IForgotPasswordProps {
  screen: ScreensForgotPassword
  passwordStrength: PasswordStrengthSection;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
}