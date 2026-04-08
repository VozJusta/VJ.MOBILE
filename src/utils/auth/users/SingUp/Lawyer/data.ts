import { formatCPF } from "@/utils/mask";
import { formatOABNumber } from "@/utils/oabValidate";
import { IInputProps } from "@/interfaces/ui/InputUI";
import { UfSelectProps, CareerSelectProps } from "@/interfaces/interfaces";
import { FieldsType } from "@/interfaces/template/SignInTemplate";

type RegisterLawyer = {
  fullName: string;
  cpf: string;
  oabNumber: string;
  uf: string;
  specialization: string;
  email: string;
  password: string;
};

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  registerAuth: RegisterLawyer;
  handleRegisterChange: (name: keyof RegisterLawyer, value: string) => void;
  specializationOptions: { label: string; value: string }[];
};

export function buildLawyerFields({
  showPassword,
  onToggleShowPassword,
  registerAuth,
  handleRegisterChange,
  specializationOptions,
}: Params): FieldsType[] {
  return [
    {
      label: "Nome completo",
      placeholder: "Nome completo conforme OAB",
      keyboardType: "default",
      leftIcon: true,
      rightIcon: false,
      iconSize: 24,
      iconNameProps: "person",
      type: "name",
      value: registerAuth.fullName,
      onChangeText: (text) => handleRegisterChange("fullName", text),
    } as IInputProps,
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
    } as IInputProps,
    {
      label: "Número OAB",
      placeholder: "000.000",
      keyboardType: "numeric",
      leftIcon: true,
      rightIcon: false,
      iconSize: 24,
      iconNameProps: "badge",
      type: "text",
      value: registerAuth.oabNumber,
      onChangeText: (text) => handleRegisterChange("oabNumber", formatOABNumber(text)),
    } as IInputProps,
    {
      label: "Estado",
      value: registerAuth.uf,
      onValueChange: (value) => handleRegisterChange("uf", value),
    } as UfSelectProps,
    {
      label: "Especialização Principal",
      value: registerAuth.specialization,
      options: specializationOptions.map(({ label }) => label),
      onValueChange: (value) => handleRegisterChange("specialization", value),
    } as CareerSelectProps,
    {
      label: "E-mail Profissional",
      placeholder: "email@exemplo.com.br",
      keyboardType: "email-address",
      leftIcon: true,
      rightIcon: false,
      iconSize: 24,
      iconNameProps: "email",
      type: "email",
      value: registerAuth.email,
      onChangeText: (text) => handleRegisterChange("email", text),
    } as IInputProps,
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
    } as IInputProps,
  ];
}