import { ReactNode } from "react";
import { PasswordStrengthSection } from "../../components/PasswordStrengh";

export enum ScreensForgotPassword {
  Email = "EMAIL",
  Code = "CODE",
  Update = "UPDATE",
}

type CodeScreenOptions = {
  codeTitle?: string;
  codeDescription?: string;
  verifyButtonLabel?: string;
  codeBackRoute?: () => void;
  onCodeVerified?: () => void;
};

export type IForgotPasswordProps =
  | ({
      email: string;
      screen: ScreensForgotPassword.Email | ScreensForgotPassword.Code;
    } & CodeScreenOptions)
  | ({
      email: string;
      labelButton?: ReactNode | string;
      onSubmit?: () => void;
      screen: ScreensForgotPassword.Update;
      passwordStrength: PasswordStrengthSection;
      newPassword: string;
      setNewPassword: (password: string) => void;
      confirmPassword: string;
      setConfirmPassword: (password: string) => void;
    } & CodeScreenOptions);
