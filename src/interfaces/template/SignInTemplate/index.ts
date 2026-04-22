import { ReactNode } from "react";
import { IPasswordStrength } from "@/interfaces/components/PasswordStrengh";
import { IInput } from "@/interfaces/ui/InputUI";
import { IUfSelect } from "@/interfaces/ui/SelectUIProps/ufSelect";
import { ICareerSelect } from "@/interfaces/ui/SelectUIProps/careerSelect";

export type FieldsType = IInput | IUfSelect | ICareerSelect;

export interface ISignInTemplate {
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
