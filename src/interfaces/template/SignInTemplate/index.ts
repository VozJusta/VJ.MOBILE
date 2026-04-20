import { UfSelectProps } from "@/interfaces/ui/SelectUIProps/ufSelect";
import { PasswordStrengthSection } from "../../components/PasswordStrengh";
import { IInputProps } from "../../ui/InputUI";
import { ReactNode } from "react";
import { CareerSelectProps } from "@/interfaces/ui/SelectUIProps/careerSelect";

export type FieldsType = IInputProps | UfSelectProps | CareerSelectProps;

export interface ISignInTemplateProps {
  title: string;
  description: string;
  fields: FieldsType[];
  onSubmit: () => Promise<void> | void;
  submitLabel: ReactNode;
  disableSubmit?: boolean;
  passwordStrength?: PasswordStrengthSection;
  extraActions?: ReactNode;
  footer?: ReactNode;
}
