import { formatCPF } from "@/utils/mask";
import { formatOABNumber } from "@/utils/oabValidate";
import { IInputProps } from "@/interfaces/ui/InputUI";
import { IBuildRegisterLawyerFields } from "@/interfaces/utils/auth/buildRegisterFields";
import { useRouter } from "expo-router";
import { UfSelectProps } from "@/interfaces/ui/SelectUIProps/ufSelect";
import { CareerSelectProps } from "@/interfaces/ui/SelectUIProps/careerSelect";
import { ILawyerRegisterData } from "@/interfaces/store/auth/users/lawyer";
import { SignUpLawyer } from "@/services/users/lawyer/SignUp";
import Toast from "react-native-toast-message";
import { Email2FA } from "@/services/users/security/email2FA";
import { email } from "zod";
import { useRolesStorage } from "@/store/auth/roles.store";
import { useAuth } from "@/hooks/auth/useAuth";
import { resolveRoleFromApi } from "@/utils/auth/resolveRole";
import { formatPhone } from "@/utils/phoneValidate";
import { ActivityIndicator, Text } from "react-native";

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  registerAuth: ILawyerRegisterData;
  handleRegisterChange: (
    name: keyof ILawyerRegisterData,
    value: string,
  ) => void;
  specializationOptions: { label: string; value: string }[];
};

export function buildLawyerFields({
  showPassword,
  onToggleShowPassword,
  registerAuth,
  handleRegisterChange,
  specializationOptions,
}: Params): IBuildRegisterLawyerFields {
  const router = useRouter();
  const setRole = useRolesStorage((state) => state.setRole);
  const { loading, setLoading } = useAuth();

  const handleRegister = async (data: ILawyerRegisterData) => {
    setLoading(true);
    try {
      const response = await SignUpLawyer(data);

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: "Erro no cadastro",
          text2: response.fields[0],
        });

        console.log("Erro no cadastro:", response.fields);

        return;
      }

      const resolvedRole = resolveRoleFromApi(response.data, "lawyer");
      setRole(resolvedRole);

      const email2FAResponse = await Email2FA(data.email);

      if (!email2FAResponse.success) {
        const errorMessage = email2FAResponse.fields[0];
        const isCodeAlreadySent =
          errorMessage === "Código já enviado" ||
          errorMessage === "Código enviado";

        if (!isCodeAlreadySent) {
          Toast.show({
            type: "error",
            text1: "Erro ao enviar email de verificação",
            text2: errorMessage,
          });
          return;
        }
      }

      Toast.show({
        type: "success",
        text1: "Verifique seu e-mail",
        text2: "Enviamos um código de segurança de 6 dígitos.",
      });

      router.push({
        pathname: "/screens/auth/Validate",
        params: {
          source: "lawyer",
          email: data.email,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    fields: [
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
        onChangeText: (text) =>
          handleRegisterChange("oabNumber", formatOABNumber(text)),
      } as IInputProps,
      {
        label: "Estado",
        value: registerAuth.oabState,
        onValueChange: (value) => handleRegisterChange("oabState", value),
      } as UfSelectProps,
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
        onChangeText: (text) =>
          handleRegisterChange("phone", formatPhone(text)),
      } as IInputProps,
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
    ],
    onSubmit: () => {
      const specializationValue =
        specializationOptions.find(
          (opt) =>
            opt.label === registerAuth.specialization ||
            opt.value === registerAuth.specialization,
        )?.value || registerAuth.specialization;

      return handleRegister({
        fullName: registerAuth.fullName,
        email: registerAuth.email,
        password: registerAuth.password,
        oabState: registerAuth.oabState,
        phone: registerAuth.phone,
        specialization: specializationValue,
        cpf: registerAuth.cpf,
        oabNumber: registerAuth.oabNumber,
      });
    },
    titleButton: loading ? (
      <ActivityIndicator size="small" color="#FFF" />
    ) : (
      <Text className="text-white text-[14px] font-inter">
        Entrar
      </Text>
    ),
    disableSubmit: loading,
  };
}
