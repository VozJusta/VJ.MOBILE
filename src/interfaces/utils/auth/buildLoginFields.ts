import { IInputProps } from "@/interfaces/ui/InputUI";
import { ReactNode } from "react";

export interface IBuildLoginFields {
    fields: IInputProps[];
    onSubmit: () => void;
    disableSubmit: boolean;
    titleButton: ReactNode;
}