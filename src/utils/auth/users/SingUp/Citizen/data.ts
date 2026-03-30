import { useAuth } from "@/hooks/useAuth";
import { ISignInTemplateProps } from "@/interfaces/template/SignInTemplate";
import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";

export function getInitialCitizenData(
  showPassword: boolean,
  onToggleShowPassword: () => void,
): ISignInTemplateProps {
  const { handleRegisterChange, registerAuth } = useAuth();
  return {
    title: "Cadastro de Cidadão",
    description: "Faça seu cadastro para transformar sua indignação em mudança",
    fields: [
      {
        label: "Nome completo",
        placeholder: "Digite seu nome completo",
        keyboardType: "default",
        leftIcon: true,
        rightIcon: false,
        iconSize: 24,
        iconNameProps: "person",
        type: "name",
        value: registerAuth.fullName,
        onChangeText: (text) => {
          handleRegisterChange("cpf", text);
        },
      },
      {
        label: "CPF",
        placeholder: "000.000.000-00",
        keyboardType: "numeric",
        leftIcon: true,
        rightIcon: false,
        iconSize: 24,
        iconNameProps: "badge",
        type: "cpf",
        value: registerAuth.cpf,
        onChangeText: (text) => {
          const formatted = formatCPF(text);
          handleRegisterChange("cpf", formatted);
        },
      },
      {
        label: "Telefone",
        placeholder: "(00) 00000-0000",
        keyboardType: "phone-pad",
        leftIcon: true,
        rightIcon: false,
        iconSize: 24,
        iconNameProps: "phone",
        type: "phone",
        value: registerAuth.phone,
        onChangeText: (text) => {
          const formatted = formatPhone(text);
          handleRegisterChange("phone", formatted);
        },
      },
      {
        label: "E-mail",
        placeholder: "email@exemplo.com",
        keyboardType: "email-address",
        leftIcon: true,
        rightIcon: false,
        iconSize: 24,
        iconNameProps: "email",
        type: "email",
        value: registerAuth.email,
        onChangeText: (text) => {
          handleRegisterChange("email", text);
        },
      },
      {
        label: "Senha de acesso",
        placeholder: "••••••••",
        secureTextEntry: !showPassword,
        leftIcon: true,
        rightIcon: true,
        rightIconName: showPassword ? "visibility-off" : "visibility",
        iconSize: 24,
        iconNameProps: "lock-outline",
        type: "password",
        value: registerAuth.password,
        onChangeText: (text) => {
          handleRegisterChange("password", text);
        },
        onRightIconPress: onToggleShowPassword,
      },
    ],
  };
}
