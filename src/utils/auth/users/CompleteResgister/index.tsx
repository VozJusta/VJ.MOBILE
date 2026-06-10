import { useAuth } from "@/hooks/auth/useAuth";
import { FieldsType } from "@/interfaces/template/SignInTemplate";
import { IInput } from "@/interfaces/ui/InputUI";
import { IBuildLoginFields } from "@/interfaces/utils/auth/buildLoginFields";
import { Role } from "@/types/roles/roles";
import {
  ZodCitizenCompleteRegisterTypes,
  ZodLawyerCompleteRegisterTypes,
} from "@/types/validation";
import { formatCPF, formatPhone } from "@/utils/mask";
import { formatOABNumber } from "@/utils/oabValidate";
import { router } from "expo-router";
import { specializationOptions } from "../Lawyer/data";
import { ICareerSelect } from "@/interfaces/ui/SelectUI/careerSelect";
import { IUfSelect } from "@/interfaces/ui/SelectUI/ufSelect";
import { ActivityIndicator, Text } from "react-native";
import { Email2FA } from "@/services/auth/users/security/email2FA";
import Toast from "react-native-toast-message";

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  registerAuth:
    | ZodLawyerCompleteRegisterTypes
    | ZodCitizenCompleteRegisterTypes;
  handleRegisterChange: (
    name:
      | keyof ZodLawyerCompleteRegisterTypes
      | keyof ZodCitizenCompleteRegisterTypes,
    value: string,
  ) => void;
  role: Role;
  email: string;
};

export function useBuildCompleteRegisterFields({
  handleRegisterChange,
  onToggleShowPassword,
  registerAuth,
  showPassword,
  role,
  email,
}: Params): IBuildLoginFields {
  const { loading, setLoading, completeRegisterData } = useAuth();

  const lawyerAuth = registerAuth as ZodLawyerCompleteRegisterTypes;

  async function handleSubmit() {
    console.log("Dados enviados para completeRegisterData:", registerAuth, role);
    const result = await completeRegisterData(registerAuth, role);
    console.log("Resultado do completeRegisterData:", result);

    if (!result?.success) return;

    const validateEmail2FA = await Email2FA(email);

    if (!validateEmail2FA.success) {
      Toast.show({
        type: "error",
        text1: validateEmail2FA.fields?.[0] || "Erro ao enviar código",
      });
      if (validateEmail2FA.fields?.[0] === "Código já enviado") {
        router.push(
          `/screens/auth/Validate?source=${role}&email=${encodeURIComponent(email)}&registerCompleted=true`,
        );
      }
      return;
    }

    Toast.show({ type: "success", text1: validateEmail2FA.data });
    router.push(
      `/screens/auth/Validate?source=${role}&email=${encodeURIComponent(email)}&registerCompleted=true`,
    );
  }

  const sharedFields: IInput[] = [
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
    } as IInput,
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
      onChangeText: (text) => handleRegisterChange("phone", formatPhone(text)),
    } as IInput,
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
    } as IInput,
  ];

  const lawyerFields: FieldsType[] =
    role === "lawyer"
      ? [
          {
            label: "Número OAB",
            placeholder: "000.000",
            keyboardType: "numeric",
            leftIcon: true,
            rightIcon: false,
            iconSize: 24,
            iconNameProps: "badge",
            type: "text",
            value: lawyerAuth.oabNumber,
            onChangeText: (text) =>
              handleRegisterChange("oabNumber", formatOABNumber(text)),
          } as IInput,
          {
            label: "Estado",
            value: lawyerAuth.oabState,
            onValueChange: (value) => handleRegisterChange("oabState", value),
          } as IUfSelect,
          {
            label: "Especialização Principal",
            value: lawyerAuth.specialization,
            options: specializationOptions.map(({ label }) => label),
            onValueChange: (value) =>
              handleRegisterChange("specialization", value),
          } as ICareerSelect,
        ]
      : [];

  return {
    fields: [...sharedFields, ...lawyerFields],
    onSubmit: handleSubmit,
    titleButton: loading ? (
      <ActivityIndicator size="small" color="#FFF" />
    ) : (
      <Text className="text-white text-[16px] font-interBold">Entrar</Text>
    ),
    disableSubmit: loading,
  };
}
