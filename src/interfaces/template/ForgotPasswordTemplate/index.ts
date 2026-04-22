import { IPasswordStrength } from "@/interfaces/components/PasswordStrengh";
import { ReactNode } from "react";

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
      passwordStrength: IPasswordStrength;
      newPassword: string;
      setNewPassword: (password: string) => void;
      confirmPassword: string;
      setConfirmPassword: (password: string) => void;
    } & CodeScreenOptions);
