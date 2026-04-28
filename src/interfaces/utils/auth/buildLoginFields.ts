import { FieldsType } from "@/interfaces/template/SignInTemplate";
import { ReactNode } from "react";

export interface IBuildLoginFields {
    fields: FieldsType[];
    onSubmit: () => void;
    disableSubmit: boolean;
    titleButton: ReactNode;
}