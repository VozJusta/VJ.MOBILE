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
import { ValidateEmail } from "@/services/users/citizen/validateEmail";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useTokenStorage } from "@/store/token.store";
export function ForgotPasswordTemplate(props: IForgotPasswordProps) {
  const router = useRouter();
  const [codeAuth, setCodeChange] = useState("");
  const token = useTokenStorage((state) => state.token);
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
    if (pathName === "/screens/auth/Validate") {
      const response = await ValidateEmail(email, code, token);
      console.log("Resposta da validação de email (raw):", response);
      if (!response.success) {
        Toast.show({
          type: "error",
          text1: response.fields && response.fields[0],
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: "Email validado com sucesso!",
      });
      router.replace("/screens/citizen/home");
      return;
    }
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
                  props.screen === ScreensForgotPassword.Email
                    ? router.replace("/screens/auth/users/SingIn")
                    : props.screen === ScreensForgotPassword.Code
                      ? router.replace(
                          props.codeBackRoute ??
                            "/screens/auth/ForgotPassword/Email",
                        )
                      : router.replace("/screens/auth/ForgotPassword/Code");
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
                <>
                  <View className="gap-[11.40px] items-center justify-center">
                    <Text className="font-interBold text-[24px] text-white">
                      Esqueceu a Senha?
                    </Text>
                    <Text className="font-interRegular text-[14px] text-white/60 text-center">
                      Não se preocupe! Informe seu e-mail cadastrado para
                      receber as instruções de recuperação.
                    </Text>
                  </View>

                  <InputUI
                    placeholder={"seu@email.com"}
                    leftIcon
                    keyboardType="email-address"
                    iconSize={24}
                    iconNameProps={"mail"}
                    type={"email"}
                  />

                  <ButtonUI
                    onPress={() =>
                      router.replace("/screens/auth/ForgotPassword/Code")
                    }
                    gradient={false}
                    bg="bg-[#135BEC]"
                    hover={false}
                    size="w-full h-[56px]"
                    children={
                      <View className="flex-1 justify-center items-center">
                        <Text className="text-[16px] font-interBold text-white">
                          Enviar código
                        </Text>
                      </View>
                    }
                    iconLeft={false}
                    paddingButtonStatus={""}
                  />
                  <ButtonUI
                    bg="bg-transparent"
                    gradient={false}
                    hover={false}
                    onPress={() => router.replace("/screens/auth/users/SingIn")}
                    children={
                      <View
                        style={{ gap: 8 }}
                        className="flex-row items-center gap-2"
                      >
                        <MaterialIcons
                          name="arrow-forward"
                          size={20}
                          style={{ transform: [{ rotate: "-180deg" }] }}
                          color={"rgba(255,255,255,0.5)"}
                        />
                        <Text className="font-inter text-[14px] text-white/50">
                          Voltar para o Login
                        </Text>
                      </View>
                    }
                    iconLeft={false}
                    paddingButtonStatus={""}
                  />
                </>
              ) : props.screen === ScreensForgotPassword.Code ? (
                <>
                  <View className="gap-[16px] items-center justify-center mb-[40px]">
                    <View className="w-[64px] h-[64px] flex justify-center items-center bg-[rgba(19,91,236,0.1)] rounded-full">
                      <Shield width={30} height={36} />
                    </View>
                    <Text className="font-interBold text-[24px] text-white text-center">
                      {resolvedCodeTitle}
                    </Text>
                    <Text className="font-interRegular text-[14px] px-[30.5px] text-[#94A3B8] text-center">
                      {resolvedCodeDescription}
                    </Text>
                  </View>

                  <InputUI
                    inputOTP
                    onChangeText={(value) => setCodeChange(value)}
                    onFilledOTP={(value) => {
                      setCodeChange(value);
                      handleValidateCode(
                        props.email,
                        value,
                        token ? token : "",
                      );
                    }}
                    placeholder={""}
                    iconSize={0}
                    iconNameProps={"sort"}
                    type={"email"}
                  />
                  <Text className="font-inter text-[12px] text-[rgba(96,165,250,0.8)]">
                    O código expira em{" "}
                    <Text className="font-interBold"> {timerLabel} </Text>
                  </Text>
                  <View className="w-full pb-[16px]">
                    <ButtonUI
                      onPress={() =>
                        handleValidateCode(
                          props.email,
                          codeAuth,
                          token ? token : "",
                        )
                      }
                      gradient={false}
                      bg="bg-[#135BEC]"
                      hover={false}
                      size="w-full h-[56px]"
                      children={
                        <View className="flex-1 justify-center items-center">
                          <Text className="text-[16px] font-interBold text-white">
                            {resolvedVerifyButtonLabel}
                          </Text>
                        </View>
                      }
                      iconLeft={false}
                      paddingButtonStatus={""}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View className="gap-[7px] w-full items-start">
                    <Text className="font-interBold text-[24px] text-white">
                      Nova senha
                    </Text>
                    <Text className="font-interRegular text-[14px] max-w-[300px] text-white/60 ">
                      Crie uma nova senha forte para proteger sua conta
                    </Text>
                  </View>
                  <InputUI
                    label="Nova senha"
                    placeholder={"••••••••"}
                    leftIcon
                    keyboardType="visible-password"
                    iconSize={24}
                    iconNameProps={"lock"}
                    type={"password"}
                    secureTextEntry={true}
                    rightIcon
                    rightIconName="visibility"
                    onRightIconPress={() => {}}
                    value={
                      props.screen === ScreensForgotPassword.Update
                        ? props.newPassword
                        : ""
                    }
                    onChangeText={(e) => {
                      if (props.screen === ScreensForgotPassword.Update) {
                        props.setNewPassword(e);
                      }
                    }}
                  />
                  <InputUI
                    label="Confirme a nova senha"
                    placeholder={"••••••••"}
                    leftIcon
                    keyboardType="visible-password"
                    iconSize={24}
                    iconNameProps={"lock"}
                    secureTextEntry={true}
                    type={"password"}
                    rightIcon
                    rightIconName="visibility"
                    onRightIconPress={() => {}}
                    value={
                      props.screen === ScreensForgotPassword.Update
                        ? props.confirmPassword
                        : ""
                    }
                    onChangeText={(e) => {
                      if (props.screen === ScreensForgotPassword.Update) {
                        props.setConfirmPassword(e);
                      }
                    }}
                  />
                  {props.screen === ScreensForgotPassword.Update &&
                    props.passwordStrength && (
                      <PasswordStrength
                        score={props.passwordStrength.score}
                        color={props.passwordStrength.color}
                        checklist={props.passwordStrength.checklist}
                      />
                    )}
                  <ButtonUI
                    onPress={() =>
                      handleValidateCode(
                        props.email,
                        codeAuth,
                        token ? token : "",
                      )
                    }
                    gradient={true}
                    hover={false}
                    children={
                      <View className="flex-1 justify-center items-center">
                        <Text className="text-[16px] font-interBold text-white">
                          Redefinir senha
                        </Text>
                      </View>
                    }
                    iconLeft={false}
                    paddingButtonStatus={""}
                  />
                </>
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
