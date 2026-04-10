import { FieldsType } from "@/interfaces/template/SignInTemplate";
import { IInputProps } from "@/interfaces/ui/InputUI";

export interface IBuildRegisterFields {
    fields: IInputProps[];
    onSubmit: () => void;
    disableSubmit: boolean;
    titleButton: string;
}

export interface IBuildRegisterLawyerFields {
    fields: FieldsType[];
    onSubmit: () => void;
    titleButton: string;
}