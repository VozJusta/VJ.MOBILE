import { useAuth } from "@/hooks/auth/useAuth";
import { CodeSeding } from "@/services/auth/forgotPassword/codeSending";
import { useEmailStorage } from "@/store/auth/email.store";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

export function EmailForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, setLoading } = useAuth();
  const setEmailStorage = useEmailStorage((state) => state.setEmail);

  const handleCodeSending = async (email: string) => {
    setLoading(true);
    setEmailStorage(email);

    const response = await CodeSeding(email);
    if (
      !response.success &&
      response.fields &&
      response.fields[0] === "Código já enviado"
    ) {
      Toast.show({
        type: "error",
        text1: response.fields && response.fields[0],
      });
      router.push("/screens/auth/ForgotPassword/Code");
      setLoading(false);
      return;
    }
    if (!response.success) {
      Toast.show({
        type: "error",
        text1: response.fields[0],
      });
      setLoading(false);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Código enviado com sucesso!",
    });
    router.push("/screens/auth/ForgotPassword/Code");
  };
  return (
    <>
      <View className="gap-[11.40px] items-center justify-center">
        <Text className="font-interBold text-[24px] text-white">
          Esqueceu a Senha?
        </Text>
        <Text className="font-interRegular text-[14px] text-white/60 text-center">
          Não se preocupe! Informe seu e-mail cadastrado para receber as
          instruções de recuperação.
        </Text>
      </View>

      <InputUI
        placeholder={"seu@email.com"}
        leftIcon
        keyboardType="email-address"
        iconSize={24}
        value={email}
        onChangeText={(value) => setEmail(value)}
        iconNameProps={"mail"}
        type={"email"}
      />

      <ButtonUI
        onPress={() => handleCodeSending(email)}
        gradient={false}
        bg="bg-[#135BEC]"
        hover={false}
        size="w-full h-[56px]"
        iconLeft={false}
        paddingButtonStatus={""}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-[16px] font-interBold text-white">
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              "Enviar código"
            )}
          </Text>
        </View>
      </ButtonUI>
    </>
  );
}
