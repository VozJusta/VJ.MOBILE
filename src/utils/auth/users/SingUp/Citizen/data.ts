import { useAuth } from "@/hooks/useAuth";
import { ISignInTemplateProps } from "@/interfaces/template/SignInTemplate";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { SingUpCitizen } from "@/settings/users/citizen/SingUp";
import { useRolesStorage } from "@/store/roles.store";
import { formatCPF } from "@/utils/mask";
import { formatPhone } from "@/utils/phoneValidate";
import { useRouter } from "expo-router/build/exports";
import Toast from "react-native-toast-message";

export function getInitialCitizenData(
  showPassword: boolean,
  onToggleShowPassword: () => void,
): ISignInTemplateProps {
  const { handleRegisterChange, registerAuth } = useAuth();
  const role = useRolesStorage((state) => state.role)
  const router = useRouter();
  const handleRegister = async (data: ZodSingUpTypes) => {
    if (role === "citizen") {
      const response = await SingUpCitizen(data)
      Toast.show({
        type: response.success ? "success" : "error",
        text1: response.fields && response.fields[0]
      })
      // router.push(
      //   `/screens/auth/Validate?source=citizen&email=${encodeURIComponent(registerAuth.email)}`)
      console.log()
      return response;
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
  };
}
