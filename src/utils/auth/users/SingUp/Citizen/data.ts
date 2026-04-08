import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { IInputProps } from "@/interfaces/ui/InputUI";

type RegisterAuth = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
};

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  registerAuth: RegisterAuth;
  handleRegisterChange: (name: keyof ZodSingUpTypes, value: string) => void;
};

export function buildCitizenFields({
  showPassword,
  onToggleShowPassword,
  registerAuth,
  handleRegisterChange,
}: Params): IInputProps[] {
  return [
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
      onChangeText: (text) => handleRegisterChange("fullName", text),
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
      onChangeText: (text) => handleRegisterChange("cpf", formatCPF(text)),
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
      onChangeText: (text) => handleRegisterChange("phone", formatPhone(text)),
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
      onChangeText: (text) => handleRegisterChange("email", text),
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
      onChangeText: (text) => handleRegisterChange("password", text),
      onRightIconPress: onToggleShowPassword,
    },
  ];
}
