import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../../../assets/svg/icons/logo.svg";
import ButtonUI from "../../../../ui/Button";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AccountBalace from "../../../../assets/svg/icons/account-balace.svg";
import ActiveAccountBalace from "../../../../assets/svg/icons/active-account-balace.svg";
import { router } from "expo-router";
export default function SelectionUserRole() {
  const [activeCitizen, setActiveCitizen] = useState(false);
  const [activeLawyer, setActiveLawyer] = useState(false);
  return (
    <LinearGradient
      className="flex-1 items-center pt-[90px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <SafeAreaView className="flex-col items-center" style={{ flex: 1 }}>
      <View className="flex-col items-center">
        <Logo width={70} height={51} />
        <Text className=" text-[36px] text-white font-montserratBold">
          VozJusta
        </Text>
      </View>
      <Text className="text-[18px] font-interSemiBold text-white mt-[72px]">
        A justiça agora fala sua língua.
      </Text>
      <Text className="text-[14px] font-inter text-white mt-[8px]">
        Para começar, quem você é?
      </Text>
      <View className="w-full px-[16px] items-center mt-[36px] gap-8">
        <ButtonUI
          hover
          size="w-full h-[103px]"
          gradient={false}
          active={activeCitizen}
          bg="bg-white"
          onPress={() => {
            setActiveCitizen(!activeCitizen);
            setActiveLawyer(false);
          }}
          children={
            <View className=" flex-1 items-center flex-row gap-[20px] px-[20px]">
              <View
                className={`rounded-[12px] ${activeCitizen ? "bg-[rgba(5,47,95,0.08)]" : "bg-[rgba(255,255,255,0.08)]"} border ${activeCitizen ? "border-BrightBlue" : "border-[rgba(255,255,255,0.12)]"} items-center justify-center py-[9px] px-[12px]`}
              >
                <MaterialIcons
                  name="person"
                  color={`${activeCitizen ? "#052F5F" : "white"}`}
                  size={30}
                />
              </View>
              <View className="gap-[2px] flex-col">
                <Text
                  className={`font-interSemiBold text-[18px] ${activeCitizen ? "text-BrightBlue" : "text-white"}`}
                >
                  Sou Cidadão
                </Text>
                <Text
                  className={`font-interRegular text-[12px] max-w-[255px] ${activeCitizen ? "text-BrightBlue" : " text-white/50"}`}
                >
                  Busco orientação e empoderamento jurídico simples.
                </Text>
              </View>
            </View>
          }
        />
        <ButtonUI
          hover
          size="w-full h-[103px]"
          gradient={false}
          active={activeLawyer}
          bg="bg-white"
          onPress={() => {
            setActiveLawyer(!activeLawyer);
            setActiveCitizen(false);
          }}
          children={
            <View className=" flex-1 items-center flex-row gap-[20px] px-[20px]">
              <View
                className={`rounded-[12px] ${activeLawyer ? "bg-[rgba(5,47,95,0.08)]" : "bg-[rgba(255,255,255,0.08)]"} border ${activeLawyer ? "border-BrightBlue" : "border-[rgba(255,255,255,0.12)]"} items-center justify-center py-[9px] px-[12px]`}
              >
                {activeLawyer ? (
                  <ActiveAccountBalace width={30} height={36} />
                ) : (
                  <AccountBalace width={30} height={36} />
                )}
              </View>
              <View className="gap-[2px] flex-col">
                <Text
                  className={`font-interSemiBold text-[18px] ${activeLawyer ? "text-BrightBlue" : "text-white"}`}
                >
                  Sou Advogado
                </Text>
                <Text
                  className={`font-interRegular text-[12px] max-w-[255px] ${activeLawyer ? "text-BrightBlue" : " text-white/50"}`}
                >
                  Quero gerenciar casos e me conectar com clientes.
                </Text>
              </View>
            </View>
          }
        />
      </View>
      <View className="w-full px-4  mt-[72px]">
        <ButtonUI
          gradient
          children={
            <View className="min-w-full h-full flex-row items-center justify-center gap-[10px]">
              <Text className="text-white font-interBold text-[14px]">
                Começar agora
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color={"#FFF"} />

            </View>
          }
          onPress={() => router.replace("/screens/auth/ForgotPassword")}
          hover={false}
        />
      </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
