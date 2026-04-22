import { UfSelectProps } from "@/interfaces/ui/SelectUIProps/ufSelect";
import { IInputProps } from "../../ui/InputUI";
import { ReactNode } from "react";
import { CareerSelectProps } from "@/interfaces/ui/SelectUIProps/careerSelect";
import { IPasswordStrength } from "@/interfaces/components/PasswordStrengh";

export type FieldsType = IInputProps | UfSelectProps | CareerSelectProps;

export interface ISignInTemplateProps {
  title: string;
  description: string;
  fields: FieldsType[];
  onSubmit: () => Promise<void> | void;
  submitLabel: ReactNode;
  disableSubmit?: boolean;
  passwordStrength?: IPasswordStrength;
  extraActions?: ReactNode;
  footer?: ReactNode;
}
