import SignInTemplate from "@/template/auth/SingInTemplate";
import { useBuildLoginFields } from "@/utils/auth/users/SingIn/data";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import GoogleIcon from "@/assets/svg/icons/Google-Icon.svg";
import { useAuth } from "@/hooks/auth/useAuth";

export default function Login() {
  const { loginAuth, handleLoginChange, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const signInData = useBuildLoginFields({
    loginAuth,
    handleLoginChange,
    showPassword,
    onToggleShowPassword: () => setShowPassword((prev) => !prev),
  });

  return (
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
            onPress={() => {}}
            disabled={true}
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
  );
}
