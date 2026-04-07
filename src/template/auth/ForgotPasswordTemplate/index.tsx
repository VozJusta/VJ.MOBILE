import {
  View,
  Text,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonUI from "@/ui/ButtonUI";
import Logo from "@/assets/svg/icons/logo.svg";
import InputUI from "@/ui/InputUI";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Shield from "@/assets/svg/icons/shield.svg";
import {
  IForgotPasswordProps,
  ScreensForgotPassword,
} from "@/interfaces/template/ForgotPasswordTemplate";
import React, { use, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import PasswordStrength from "@/components/PasswordStrengh";
import { ValidateEmail } from "@/services/users/security/validateEmail";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useXTokenStorage, useAccessTokenStorage } from "@/store/token.store";
import { CodeSeding } from "@/services/auth/forgotPassword/codeSending";
import { ValidateCode } from "@/services/auth/forgotPassword/codeVerify";
import { useAuth } from "@/hooks/useAuth";
import { useEmailStorage } from "@/store/email.store";
import { set } from "zod";
export function ForgotPasswordTemplate(props: IForgotPasswordProps) {
  const router = useRouter();

  const [codeAuth, setCodeChange] = useState("");
  const token = useXTokenStorage((state) => state.token);

  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const resolvedCodeTitle = props.codeTitle ?? "Verificação de Email";
  const resolvedCodeDescription =
    props.codeDescription ?? "Enviamos um código de 6 dígitos para seu email";
  const resolvedVerifyButtonLabel =
    props.verifyButtonLabel ?? "Verificar Email";

  useEffect(() => {
    if (props.screen !== ScreensForgotPassword.Code) {
      return;
    }

    setSecondsLeft(5 * 60);
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.screen]);

  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const pathName = usePathname();

  

  const handleValidateCode = async (
    email: string,
    code: string,
    token: string,
  ) => {
    setLoading(true);
    console.log("Validando código para email:", email);
    const response = await ValidateEmail(email, code, token);

    if (!response.success) {
      Toast.show({
        type: "error",
        text1: response.fields && response.fields[0],
      });
      setLoading(false);
      return;
    }
    Toast.show({
      type: "success",
      text1: "Email validado com sucesso!",
    });
    router.replace("/screens/citizen/home");
    return;
  };

  const handleValidateCodeForgotPassword = async (
    email: string,
    code: string,
  ) => {
    setLoading(true);
    Alert.alert(
      "Iniciando validação",
      `Email: ${emailStorage}\nCódigo: ${code}`,
    );
    const response = await ValidateCode(emailStorage, code);

    if (!response.success) {
      Toast.show({
        type: "error",
        text1: response.fields && response.fields[0][0],
      });
      setLoading(false);
      return;
    }
    Toast.show({
      type: "success",
      text1: "Email validado com sucesso!",
    });
    router.replace("/screens/citizen/home");
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="px-4" style={{ flex: 1 }}>
          <View className="flex flex-1 justify-center items-center">
            <View className="mb-8 flex-row justify-between items-center w-full">
              <ButtonUI
                goBack
                size="w-[40px] h-[40px]"
                onPress={() => {
                  router.back();
                }}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
              <Logo width={40} height={29} />
            </View>
            <View
              style={{
                boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
              }}
              className={`w-full gap-[32px] bg-white/5 rounded-xl h-auto flex-col items-center border border-solid border-[rgba(255,255,255,0.13)] ${props.screen === ScreensForgotPassword.Update ? "px-4 pt-[29px] pb-[45px]" : "px-4 py-8"}`}
            >
              {props.screen === ScreensForgotPassword.Email ? (
                rops.screen === ScreensForgotPassword.Code ? (
                
              ) : (
                
              )}
            </View>
            {props.screen === ScreensForgotPassword.Code && (
              <View className="mt-[32px] flex-row gap-[4px]">
                <Text className=" font-inter text-[14px] text-[#64748B]">
                  Não recebeu o código?
                </Text>
                <Text className=" font-interBold text-[14px] text-white underline">
                  Reenviar
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
