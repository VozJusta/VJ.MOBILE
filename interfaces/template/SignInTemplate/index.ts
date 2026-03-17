import { PasswordStrengthSection } from "../../components/PasswordStrengh";
import { CareerSelectProps, UfSelectProps } from "../../interfaces";
import { IInputProps } from "../../ui/InputUI";

export type FieldsType = IInputProps | UfSelectProps | CareerSelectProps;


export interface ISignInTemplateProps {
  layout?: "default" | "login";
  showHeader?: boolean;
  title: string;
  description: string;
  descriptionToFieldsSpacing?: number;
  fields: FieldsType[];
  passwordStrength?: PasswordStrengthSection;
  onSubmit?: () => void;
  submitLabel?: string;
  showTerms?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordRoute?: string;
  showSocialGoogle?: boolean;
  footerPrefixText?: string;
  footerActionText?: string;
  footerActionRoute?: string;
  footerActionTextClassName?: string;
}