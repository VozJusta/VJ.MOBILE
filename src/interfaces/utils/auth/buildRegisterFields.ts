import { FieldsType } from "@/interfaces/template/SignInTemplate";
import { IInput } from "@/interfaces/ui/InputUI";
import { ReactNode } from "react";

export interface IBuildRegisterFields {
    fields: IInput[];
    onSubmit: () => void;
    disableSubmit: boolean;
    titleButton: ReactNode;
}

export interface IBuildRegisterLawyerFields {
    fields: FieldsType[];
    onSubmit: () => void;
    titleButton: ReactNode;
    disableSubmit: boolean;
}