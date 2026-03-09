import { CareerSelectProps, UfSelectProps } from "../../interfaces";
import { IInputProps } from "../../ui/Input";

export type FieldsType = IInputProps | UfSelectProps | CareerSelectProps;

export interface PasswordChecklistItem {
  label: string;
  valid: boolean;
}

export interface PasswordStrengthSection {
  score: number;
  color: string;
  checklist: PasswordChecklistItem[];
}

export interface ISignInTemplateProps {
  layout?: "default" | "login";
  showHeader?: boolean;
  title: string;
  description: string;
  descriptionToFieldsSpacing?: number;
  fields: FieldsType[];
  passwordStrength?: PasswordStrengthSection;
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