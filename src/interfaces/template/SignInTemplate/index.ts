import { PasswordStrengthSection } from "../../components/PasswordStrengh";
import { CareerSelectProps, UfSelectProps } from "../../interfaces";
import { IInputProps } from "../../ui/InputUI";
import { ReactNode } from "react";

export type FieldsType = IInputProps | UfSelectProps | CareerSelectProps;

export interface ISignInTemplateProps {
  title: string;
  description: string;
  fields: FieldsType[];
  onSubmit: () => Promise<void> | void;
  submitLabel: string;
  disableSubmit?: boolean;
  passwordStrength?: PasswordStrengthSection;
  extraActions?: ReactNode;
  footer?: ReactNode;
}
