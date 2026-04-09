import { IInputProps } from "@/interfaces/ui/InputUI";

export interface IBuildRegisterFields {
    fields: IInputProps[];
    onSubmit: () => void;
    disableSubmit: boolean;
    submitLabel: string;
}