import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Animated } from "react-native";
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
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
export function ForgotPasswordTemplate({ screen }: IdScreen) {
  const router = useRouter();
  const animatedWidth = useRef(new Animated.Value(0)).current;
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
            className={`w-full gap-[32px] bg-white/5 rounded-xl h-auto flex-col items-center border border-solid border-[rgba(255,255,255,0.13)] ${ screen === ScreensForgotPassword.Update? "px-4 pt-[29px] pb-[45px]" : "px-4 py-8"}`}
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
                <View className="gap-[16px] items-center justify-center mb-[40px]">
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
                  inputOTP
                  placeholder={""}
                  iconSize={0}
                  iconNameProps={"sort"}
                  type={"email"}
                />
                <Text className="font-inter text-[12px] text-[rgba(96,165,250,8)]">
                  O código expira em{" "}
                  <Text className="font-interBold"> 04:59 </Text>
                </Text>
                <View className="w-full pb-[16px]">
                  <ButtonUI
                    onPress={() => router.replace("/screens/auth/ForgotPassword/Update")}
                    gradient={false}
                    bg="bg-[#135BEC]"
                    hover={false}
                    size="w-full h-[56px]"
                    children={
                      <View className="flex-1 justify-center items-center">
                        <Text className="text-[16px] font-interBold text-white">
                          Verificar Email
                        </Text>
                      </View>
                    }
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
                />
                <View className="bg-[#fff]/5 border border-[rgba(255,255,255,0.12)] rounded-[12px] p-[16px] -mt-12">
                              <Text className="text-[10px] text-[#94A3B8] pb-[8px] font-inter">
                                Força da Segurança
                              </Text>
                
                              <View className="w-full h-3 bg-[#fff]/5 rounded-full mt-1">
                                <Animated.View
                                  className="h-full rounded-full"
                                  style={{
                                    width: animatedWidth.interpolate({
                                      inputRange: [0, 100],
                                      outputRange: ["0%", "100%"],
                                    }),
                                    backgroundColor: props.passwordStrength.color,
                                  }}
                                />
                              </View>
                
                              <View className="flex-row gap-[90px] mt-[8px]">
                                <View className="flex-col">
                                  {props.passwordStrength.checklist.slice(0, 2).map((item) => (
                                    <CheckListFunction key={item.label} valid={item.valid} label={item.label} />
                                  ))}
                                </View>
                                <View className="flex-col">
                                  {props.passwordStrength.checklist.slice(2, 4).map((item) => (
                                    <CheckListFunction key={item.label} valid={item.valid} label={item.label} />
                                  ))}
                                </View>
                              </View>
                            </View>
                          )

                <ButtonUI
                  onPress={() => {}}
                  gradient={true}
                  hover={false}
                  children={
                    <View className="flex-1 justify-center items-center">
                      <Text className="text-[16px] font-interBold text-white">
                        Redefinir senha
                      </Text>
                    </View>
                  }
                />
            
              </>
            )}
          </View>
          {screen === ScreensForgotPassword.Code && (
            <View className="mt-[32px] flex-row gap-[4px]">
              <Text className=" font-inter text-[14px] text-[#64748B]">
                Não recebeu o código?
              </Text>
              <Text className=" font-interBold text-[14px] text-white underline v">
                Reenviar
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
