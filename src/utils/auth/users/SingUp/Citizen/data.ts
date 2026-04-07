import { useAuth } from "@/hooks/useAuth";
import { ISignInTemplateProps } from "@/interfaces/template/SignInTemplate";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { Email2FA } from "@/settings/users/citizen/email2FA";
import { SingUpCitizen } from "@/settings/users/citizen/SingUp";
import { useRolesStorage } from "@/store/roles.store";
import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { resolveRoleFromApi } from "@/utils/auth/resolveRole";

export function getInitialCitizenData(
  showPassword: boolean,
  onToggleShowPassword: () => void,
  registerAuth: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    cpf: string;
  },
  handleRegisterChange: (name: keyof ZodSingUpTypes, value: string) => void,
): ISignInTemplateProps {
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
          handleRegisterChange("fullName", text);
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
    onSubmit: () => handleRegister(registerAuth),
    submitLabel: loading ? "carregando..." : "continuar",
    disableSubmit: loading
  };
}
