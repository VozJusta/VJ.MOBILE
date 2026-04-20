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
import {
  IForgotPasswordProps,
  ScreensForgotPassword,
} from "@/interfaces/template/ForgotPasswordTemplate";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { useXTokenStorage } from "@/store/auth/token.store";
import { EmailForgotPassword } from "@/components/form/EmailForgotPassword";
import { CodeForgotPassword } from "@/components/form/CodeForgotPassword";
import { UpdateForgotPassword } from "@/components/form/UpdateForgotPassword";

export function ForgotPasswordTemplate(props: IForgotPasswordProps) {
  const router = useRouter();

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
              {props.screen === ScreensForgotPassword.Email && (
                <EmailForgotPassword />
              )}
              {props.screen === ScreensForgotPassword.Code && (
                <CodeForgotPassword
                  resolvedCodeDescription={resolvedCodeDescription}
                  resolvedCodeTitle={resolvedCodeTitle}
                  resolvedVerifyButtonLabel={resolvedVerifyButtonLabel}
                  timerLabel={timerLabel}
                  emailValidateScreen={props.email}
                  onCodeVerified={props.onCodeVerified || (() => {})}
                />
              )}
              {props.screen === ScreensForgotPassword.Update && (
                <UpdateForgotPassword
                onSubmit={() => props.onSubmit && props.onSubmit()}
                  confirmPassword={props.confirmPassword}
                  labelButton={props.labelButton}
                  newPassword={props.newPassword}
                  passwordStrength={props.passwordStrength}
                  setConfirmPassword={props.setConfirmPassword}
                  setNewPassword={props.setNewPassword}
                />
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
