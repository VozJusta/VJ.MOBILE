import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Logo from "../../../../assets/svg/icons/logo.svg";
import ButtonUI from "../../../../ui/Button";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AccountBalace from "../../../../assets/svg/icons/account-balace.svg"
import ActiveAccountBalace from "../../../../assets/svg/icons/active-account-balace.svg";
import { useRouter } from "expo-router";

export default function SelectionUserRole() {
  const [activeCitizen, setActive] = useState(false);
  const [activeLawyer, setActiveLawyer] = useState(false);
  const router = useRouter();

  return (
    <LinearGradient
      className="flex-1 items-center pt-[90px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <View className=" items-center">
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
          onPress={() => setActive(!activeCitizen)}
          children={
            <View className=" flex-1 items-center flex-row gap-[20px] px-[20px]">
              <View className={`rounded-[12px] ${activeCitizen ? "bg-[rgba(5,47,95,0.08)]" : "bg-[rgba(255,255,255,0.08)]"} border ${activeCitizen ? "border-BrightBlue" : "border-[rgba(255,255,255,0.12)]"} items-center justify-center py-[9px] px-[12px]`}>
                <MaterialIcons name="person" color={`${activeCitizen ? "#052F5F" : "white"}`} size={30} />
              </View>
              <View className="gap-[2px] flex-col">
                <Text className={`font-interSemiBold text-[18px] ${activeCitizen ? "text-BrightBlue" : "text-white"}`}>
                  Sou Cidadão
                </Text>
                <Text className={`font-interRegular text-[12px] max-w-[255px] ${activeCitizen ? "text-BrightBlue" : " text-white/50"}`}>
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
          onPress={() => setActive(!activeLawyer)}
          children={
            <View className=" flex-1 items-center flex-row gap-[20px] px-[20px]">
              <View className="rounded-[12px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] items-center justify-center py-[9px] px-[12px]">
                <AccountBalace width={30} height={36} />
              </View>
              <View className="gap-[2px] flex-col">
                <Text className="font-interSemiBold text-[18px] text-white">
                  Sou Advogado
                </Text>
                <Text className="font-interRegular text-[12px] max-w-[255px] text-white/50">
                  Quero gerenciar casos e me conectar com clientes.
                </Text>
              </View>
            </View>
          }
        />
      </View>
      <View className="w-full px-4 mt-[72px]">
        <ButtonUI
          gradient
          children={
            <View className="flex-1 flex-row items-center justify-center gap-[10px]">
              <Text className="text-white font-interBold text-[14px]">
                Começar agora
              </Text>
              <MaterialIcons name="keyboard-arrow-right" size={20} color={"#FFF"} />

            </View>
          }
          onPress={() => {
            if (activeCitizen) router.replace("/screens/Authentication/Citizen");
            if (activeLawyer) router.replace("/screens/Authentication/Lawyer");
            // Only proceed if a role has been selected.
            if (!activeCitizen && !activeLawyer) {
              return;
            }
            // TODO: Implement navigation or submit logic based on the selected role.
          }}
          hover={false}
        />
      </View>

    </LinearGradient>
  );
}
