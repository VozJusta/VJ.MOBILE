import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonUI from "../../../ui/ButtonUI";
import Logo from "../../../assets/svg/icons/logo.svg";
import InputUI from "../../../ui/InputUI";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Shield from "../../../assets/svg/icons/shield.svg";
import {
  IdScreen,
  ScreensForgotPassword,
} from "../../../interfaces/interfaces";
import React, { useState } from "react";
import { useRouter } from "expo-router";
export function ForgotPasswordTemplate({ screen }: IdScreen) {
  const router = useRouter();
  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex-1 pt-[58px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <SafeAreaView className="px-4" style={{ flex: 1 }}>
        <View className="flex flex-1 justify-center items-center">
          <View className="mb-8 flex-row justify-between items-center w-full">
            <ButtonUI
              goBack
              size="w-[40px] h-[40px]"
              onPress={() => {
                screen === ScreensForgotPassword.Email
                  ? ""
                  : screen === ScreensForgotPassword.Code
                    ? router.replace("/screens/auth/ForgotPassword/Email")
                    : router.replace("/screens/auth/ForgotPassword/Code");
              }}
              gradient={false}
              hover={false}
            />
            <Logo width={40} height={29} />
          </View>
          <View
            style={{
              boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
            }}
            className="w-full gap-[32px] bg-white/5 rounded-xl h-auto flex-col items-center border border-solid border-[rgba(255,255,255,0.13)] px-4 py-8"
          >
            {screen === ScreensForgotPassword.Email ? (
              <>
                <View className="gap-[11.40px] items-center justify-center">
                  <Text className="font-interBold text-[24px] text-white">
                    Esqueceu a Senha?
                  </Text>
                  <Text className="font-interRegular text-[14px] text-white/60 text-center">
                    Não se preocupe! Informe seu e-mail cadastrado para receber
                    as instruções de recuperação.
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
                        Enviar códiogo
                      </Text>
                    </View>
                  }
                />
                <ButtonUI
                  bg="bg-transparent"
                  gradient={false}
                  hover={false}
                  shadow="shadow-custom"
                  onPress={() => {}}
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
                />
              </>
            ) : screen === ScreensForgotPassword.Code ? (
              <>
                <View className="gap-[16px] items-center justify-center">
                  <View className="w-[64px] h-[64px] flex justify-center items-center bg-[rgba(19,91,236,0.1)] rounded-full">
                    <Shield width={30} height={36} />
                  </View>
                  <Text className="font-interBold text-[24px] text-white text-center">
                    Verificação de Email
                  </Text>
                  <Text className="font-interRegular text-[14px] px-[30.5px] text-[#94A3B8] text-center">
                    Enviamos um código de 6 dígitos para seu email
                  </Text>
                </View>

                <InputUI
                    inputOTP placeholder={""} iconSize={0} iconNameProps={"sort"} type={"email"}                />

                <ButtonUI
                  onPress={() => {}}
                  gradient={false}
                  bg="bg-[#135BEC]"
                  hover={false}
                  size="w-full h-[56px]"
                  children={
                    <View className="flex-1 justify-center items-center">
                      <Text className="text-[16px] font-interBold text-white">
                        Enviar códiogo
                      </Text>
                    </View>
                  }
                />
                <ButtonUI
                  bg="bg-transparent"
                  gradient={false}
                  hover={false}
                  shadow="shadow-custom"
                  onPress={() => {}}
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
                />
              </>
            ) : (
              <>
                <View className="gap-[11.40px] items-center justify-center">
                  <Text className="font-interBold text-[24px] text-white">
                    Esqueceu a Senha?
                  </Text>
                  <Text className="font-interRegular text-[14px] text-white/60 text-center">
                    Não se preocupe! Informe seu e-mail cadastrado para receber
                    as instruções de recuperação.
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
                  onPress={() => {}}
                  gradient={false}
                  bg="bg-[#135BEC]"
                  hover={false}
                  size="w-full h-[56px]"
                  children={
                    <View className="flex-1 justify-center items-center">
                      <Text className="text-[16px] font-interBold text-white">
                        Enviar códiogo
                      </Text>
                    </View>
                  }
                />
                <ButtonUI
                  bg="bg-transparent"
                  gradient={false}
                  hover={false}
                  shadow="shadow-custom"
                  onPress={() => {}}
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
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
