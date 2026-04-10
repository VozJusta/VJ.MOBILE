import { IInputProps } from "@/interfaces/ui/InputUI";

export interface IBuildLoginFields {
fields: IInputProps[];
onSubmit: () => void;
disableSubmit: boolean;
titleButton: string;
}