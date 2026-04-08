import { ZodLoginTypes } from "@/interfaces/validation/zodTypes";
import { IInputProps } from "@/interfaces/ui/InputUI";

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  loginAuth?: ZodLoginTypes;
  handleLoginChange?: (name: keyof ZodLoginTypes, value: string) => void;
};

export function buildLoginFields({
  showPassword,
  onToggleShowPassword,
  loginAuth,
  handleLoginChange,
}: Params): IInputProps[] {
  return [
    {
      label: "E-mail",
      placeholder: "seu@email.com",
      keyboardType: "email-address",
      leftIcon: true,
      rightIcon: false,
      iconSize: 24,
      iconNameProps: "email",
      type: "email",
      value: loginAuth?.email,
      onChangeText: (text) => handleLoginChange("email", text),
    },
    {
      label: "Senha",
      placeholder: "••••••••",
      secureTextEntry: !showPassword,
      leftIcon: true,
      rightIcon: true,
      rightIconName: showPassword ? "visibility-off" : "visibility",
      iconSize: 24,
      iconNameProps: "lock-outline",
      type: "password",
      value: loginAuth?.password,
      onChangeText: (text) => handleLoginChange("password", text),
      onRightIconPress: onToggleShowPassword,
    },
  ];
}