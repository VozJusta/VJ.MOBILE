import { ZodLoginTypes } from "@/interfaces/validation/zodTypes";
import { IInputProps } from "@/interfaces/ui/InputUI";
import { useAuth } from "@/hooks/auth/useAuth";
import { Email2FA } from "@/services/users/security/email2FA";
import { SingIn } from "@/services/users/SingIn";
import { useRolesStorage } from "@/store/auth/roles.store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { ActivityIndicator, Text } from "react-native";
import { IBuildLoginFields } from "@/interfaces/utils/auth/buildLoginFields";

type Params = {
  showPassword: boolean;
  onToggleShowPassword: () => void;
  loginAuth: ZodLoginTypes;
  handleLoginChange: (name: keyof ZodLoginTypes, value: string) => void;
};

export function buildLoginFields({
  showPassword,
  onToggleShowPassword,
  loginAuth,
  handleLoginChange,
}: Params): IBuildLoginFields {
  const { loading, setLoading } = useAuth();
  const router = useRouter();

  async function handleLogin(data: ZodLoginTypes) {
    setLoading(true);
    try {
      const response = await SingIn(data);

      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.fields?.[0] || "Erro ao autenticar",
        });
        return;
      }

      const userRole = response.data?.role?.toLowerCase();

      const validateEmail2FA = await Email2FA(data.email);
      if (
        !validateEmail2FA.success &&
        validateEmail2FA.fields &&
        validateEmail2FA.fields[0] === "Código já enviado"
      ) {
        Toast.show({
          type: "error",
          text1: validateEmail2FA.fields && validateEmail2FA.fields[0],
        });
        router.push({
          pathname: "/screens/auth/Validate",
          params: {
            source: userRole,
            email: data.email,
          },
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  }
  return {
    fields: [
      {
        label: "E-mail",
        placeholder: "seu@email.com",
        keyboardType: "email-address",
        leftIcon: true,
        rightIcon: false,
        iconSize: 24,
        iconNameProps: "email",
        type: "email",
        value: loginAuth.email ?? "",
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
        value: loginAuth.password ?? "",
        onChangeText: (text) => handleLoginChange("password", text),
        onRightIconPress: onToggleShowPassword,
      },
    ],
    onSubmit: () => handleLogin(loginAuth),
    disableSubmit: loading,
    titleButton: loading ? (
      <ActivityIndicator size="small" color="#FFF" />
    ) : (
      <Text className="text-white text-[16px] font-interBold">Entrar</Text>
    ),
  };
}
