import SignInTemplate from "@/template/auth/SingInTemplate";
import { useBuildLoginFields } from "@/utils/auth/users/SingIn/data";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import GoogleIcon from "@/assets/svg/icons/Google-Icon.svg";
import { useAuth } from "@/hooks/auth/useAuth";
import { BottomSheetGoogle } from "@/components/BottomSheetGoogle";
import { Role } from "@/types/roles/roles";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import Toast from "react-native-toast-message";
import { useXTokenStorage } from "@/store/auth/token.store";
import { Email2FA } from "@/services/auth/users/security/email2FA";

export default function Login() {
  const { loginAuth, handleLoginChange, loading } = useAuth();
  const { setToken } = useXTokenStorage();
  const [showPassword, setShowPassword] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("citizen");
  const { loginWithGoogle, loading: googleLoading } = useGoogleAuth();

  const signInData = useBuildLoginFields({
    loginAuth,
    handleLoginChange,
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
  });

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle(selectedRole);

    if (!result.success) {
      setSheetVisible(false);
      Toast.show({
        type: "error",
        text1: "Erro ao entrar com Google",
        text2: result.error,
      });
      return;
    }

    setSheetVisible(false);
    await setToken(result.token || "");

    if (!result.registerCompleted) {
    router.push(
      `/screens/auth/CompleteRegister?source=${selectedRole}&email=${encodeURIComponent(result.email || "")}`,
    );
    return;
  }

    const validateEmail2FA = await Email2FA(result.email || "");

    if (
      !validateEmail2FA.success &&
      validateEmail2FA.fields?.[0] === "Código já enviado"
    ) {
      Toast.show({
        type: "error",
        text1: validateEmail2FA.fields[0],
      });
      router.push(
        `/screens/auth/Validate?source=${selectedRole}&email=${encodeURIComponent(result.email || "")}&registerCompleted=${result.registerCompleted}`,
      );
      return;
    }

    if (!validateEmail2FA.success) {
      Toast.show({
        type: "error",
        text1: validateEmail2FA.fields?.[0] || "Erro ao enviar código",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: validateEmail2FA.data,
    });

    router.push(
      `/screens/auth/Validate?source=${selectedRole}&email=${encodeURIComponent(result.email || "")}&registerCompleted=${result.registerCompleted}`,
    );
  };

  return (
    <>
      <SignInTemplate
        title="Entrar no VozJusta"
        description="Acesse sua conta para continuar"
        fields={signInData.fields}
        onSubmit={signInData.onSubmit}
        submitLabel={signInData.titleButton}
        disableSubmit={loading || signInData.disableSubmit}
        extraActions={
          <>
            <Text
              className="text-[#60A5FA] text-[12px] font-interBold underline text-right"
              onPress={() => router.push("/screens/auth/ForgotPassword/Email")}
            >
              ESQUECI MINHA SENHA
            </Text>

            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-[1px] bg-white/10" />
              <Text className="text-white/40 text-[12px] font-interBold tracking-[2px]">
                OU ENTRE COM
              </Text>
              <View className="flex-1 h-[1px] bg-white/10" />
            </View>

            <TouchableOpacity
              onPress={() => setSheetVisible(true)}
              disabled={loading}
              className="w-full h-[56px] rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.03)] flex-row items-center justify-center gap-3"
            >
              <GoogleIcon width={20} height={20} />
              <Text className="text-white text-[14px] font-inter">Google</Text>
            </TouchableOpacity>
          </>
        }
        footer={
          <Text className="text-[#64748B] text-[14px] font-interRegular">
            Ainda não tem conta?{" "}
            <Text
              className="text-white underline font-interBold"
              onPress={() => router.push("/screens/Onboarding/roles")}
            >
              Cadastre-se
            </Text>
          </Text>
        }
      />

      <BottomSheetGoogle
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onConfirm={handleLoginWithGoogle}
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        loading={googleLoading}
      />
    </>
  );
}
