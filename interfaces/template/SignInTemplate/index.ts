import { UfSelectProps } from "../../interfaces";
import { IInputProps } from "../../ui/Input";

export type FieldsType = IInputProps | UfSelectProps;

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
  title: string;
  description: string;
  fields: FieldsType[];
  passwordStrength?: PasswordStrengthSection;
}