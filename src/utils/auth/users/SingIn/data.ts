import { ZodLoginTypes } from "@/interfaces/validation/zodTypes";
import { IInputProps } from "@/interfaces/ui/InputUI";
import { useAuth } from "@/hooks/useAuth";
import { Email2FA } from "@/services/users/security/email2FA";
import { SingInCitizen } from "@/services/users/SingIn";
import { useRolesStorage } from "@/store/roles.store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
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
  const role = useRolesStorage((state) => state.role);
  const { loading, setLoading } = useAuth();
  const router = useRouter();

  async function handleLogin(data: ZodLoginTypes) {
    setLoading(true);
    try {
      if (role === "citizen") {
        const response = await SingInCitizen(data);
        if (!response.success) {
          Toast.show({
            type: "error",
            text1: response.fields && response.fields[0],
          });
          return;
        }

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
          router.push(
            `/screens/auth/Validate?source=citizen&email=${encodeURIComponent(loginAuth.email)}`,
          );
          return;
        }
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
          `/screens/auth/Validate?source=citizen&email=${encodeURIComponent(loginAuth.email)}`,
        );
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
  };
}
