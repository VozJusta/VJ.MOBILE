import { ISignInTemplateProps } from "../../../../interfaces/template/SignInTemplate";

export const getInitialCitizenData = (name: string, onNameChange: (text: string) => void): ISignInTemplateProps => ({
    title: "Cadastro de Cidadão",
    description: "Faça seu cadastro para transformar sua indignação em mudança",
    fields: [
        {
            label: "Nome Completo",
            placeholder: "Digite seu nome completo",
            keyboardType: "default",
            leftIcon: true,
            rightIcon: false,
            iconSize: 24,
            iconNameProps: "person",
            value: name,
            onChangeText: onNameChange,
        }
    ]
}); 