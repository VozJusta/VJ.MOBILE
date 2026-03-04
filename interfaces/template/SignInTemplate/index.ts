import { UfSelectProps } from "../../interfaces";
import { IInputProps } from "../../ui/Input";

export type FieldsType = IInputProps | UfSelectProps;

export interface ISignInTemplateProps {
  title: string;
  description: string;
  fields: FieldsType[];
}