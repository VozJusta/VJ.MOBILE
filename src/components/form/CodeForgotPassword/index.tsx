import { useAuth } from "@/hooks/useAuth";
import { ValidateCode } from "@/services/auth/forgotPassword/codeVerify";
import { ValidateEmail } from "@/services/users/security/validateEmail";
import { useEmailStorage } from "@/store/email.store";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import Shield from "@/assets/svg/icons/shield.svg";
import Toast from "react-native-toast-message";
import { useXTokenStorage } from "@/store/token.store";
import { ICodeForgotPasswordProps } from "@/interfaces/components/Forms/forgotPassword";

export function CodeForgotPassword({
  emailValidateScreen,
  resolvedCodeDescription,
  resolvedCodeTitle,
  resolvedVerifyButtonLabel,
  timerLabel,
}: ICodeForgotPasswordProps) {
  const { loading, setLoading } = useAuth();
  const emailStorage = useEmailStorage((state) => state.email);
  const pathName = usePathname();
  const [codeAuth, setCodeChange] = useState("");
  const token = useXTokenStorage((state) => state.token);

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
          if (pathName.includes("/screens/auth/Validate")) {
            handleValidateCode(emailValidateScreen, value, token ? token : "");
          } else if (pathName.includes("/screens/auth/ForgotPassword/Code")) {
            handleValidateCodeForgotPassword(emailStorage, value);
          }
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
          onPress={() => {
            if (pathName.includes("/screens/auth/Validate")) {
              handleValidateCode(
                emailValidateScreen,
                codeAuth,
                token ? token : "",
              );
            } else if (pathName.includes("/screens/auth/ForgotPassword/Code")) {
              handleValidateCodeForgotPassword(emailStorage, codeAuth);
            }
          }}
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
  );
}
