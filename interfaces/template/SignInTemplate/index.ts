import { InputProps, UfSelectProps } from "../../interfaces";

export type FieldsType = InputProps | UfSelectProps;

export interface ISignInTemplateProps {
  title: string;
  description: string;
  fields: FieldsType[];
  textButton: string;
  redirectText?: string;
  redirectLink?: string;
}