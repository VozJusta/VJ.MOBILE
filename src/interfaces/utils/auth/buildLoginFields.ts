import { IInput } from "@/interfaces/ui/InputUI";
import { ReactNode } from "react";

export interface IBuildLoginFields {
    fields: IInput[];
    onSubmit: () => void;
    disableSubmit: boolean;
    titleButton: ReactNode;
}