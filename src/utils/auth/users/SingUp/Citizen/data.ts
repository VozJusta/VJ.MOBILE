import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { IInputProps } from "@/interfaces/ui/InputUI";
import { useRolesStorage } from "@/store/roles.store";
import { useAuth } from "@/hooks/useAuth";
import { SingUpCitizen } from "@/services/users/citizen/SingUp";
import { Email2FA } from "@/services/users/security/email2FA";
import { resolveRoleFromApi } from "@/utils/auth/resolveRole";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { IBuildRegisterFields } from "@/interfaces/utils/auth/buildRegisterFields";

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  registerAuth: ZodSingUpTypes;
  handleRegisterChange: (name: keyof ZodSingUpTypes, value: string) => void;
};

export function buildCitizenFields({
  showPassword,
  onToggleShowPassword,
  registerAuth,
  handleRegisterChange,
}: Params): IBuildRegisterFields {
  const setRole = useRolesStorage((state) => state.setRole);
  const { loading, setLoading } = useAuth();
  const router = useRouter();

  async function handleRegister(data: ZodSingUpTypes) {
    setLoading(true);
    try {
      const response = await SingUpCitizen(data);
      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.fields && response.fields[0],
        });

        const validateEmail2FA = await Email2FA(data.email);
        if (!validateEmail2FA.success) {
          Toast.show({
            type: "error",
            text1: validateEmail2FA.fields && validateEmail2FA.fields[0],
          });
          return;
        }
        Toast.show({
          type: "success",
          text1: validateEmail2FA.data,
        });

        router.push(
          `/screens/auth/Validate?source=citizen&email=${encodeURIComponent(registerAuth.email)}`,
        );
        return;
      }

      const resolvedRole = resolveRoleFromApi(response.data, "citizen");
      setRole(resolvedRole);

      Toast.show({
        type: "success",
        text1: "Cadastro realizado",
      });

      const validateEmail2FA = await Email2FA(data.email);
      if (!validateEmail2FA.success) {
        Toast.show({
          type: "error",
          text1: validateEmail2FA.fields && validateEmail2FA.fields[0],
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: validateEmail2FA.data,
      });

      router.push(
        `/screens/auth/Validate?source=${resolvedRole}&email=${encodeURIComponent(registerAuth.email)}`,
      );
    } finally {
      setLoading(false);
    }
  }
  return {
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
        value: registerAuth.fullName ?? "",
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
        value: registerAuth.cpf ?? "",
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
        value: registerAuth.phone ?? "",
        onChangeText: (text) =>
          handleRegisterChange("phone", formatPhone(text)),
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
        value: registerAuth.email ?? "",
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
        value: registerAuth.password ?? "",
        onChangeText: (text) => handleRegisterChange("password", text),
        onRightIconPress: onToggleShowPassword,
      },
    ],
    onSubmit: () => handleRegister(registerAuth),
    submitLabel: loading ? "carregando..." : "continuar",
    disableSubmit: loading,
  };
}
