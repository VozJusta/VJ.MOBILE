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
