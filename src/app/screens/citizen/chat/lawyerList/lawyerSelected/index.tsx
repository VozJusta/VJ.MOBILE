import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import ButtonUI from "@/ui/ButtonUI";
import { router } from "expo-router";

export default function LawyerSelected() {
  return (
    <SafeAreaView style={{ flex: 1, gap: 32 }} className="flex-1 gap-8 items-center">
      <Header isFirstPage={false} title="DR. JOÃO SILVA" isCitizen={true} />
      <View className=" rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] bg-[#1E293B] justify-center items-center">
        <MaterialIcons name="person" size={48} color={"#8E8E93"} />
      </View>
      <View className="flex-col justify-center items-center">
        <Text className="font-interBold text-[24px] text-[#F1F5F9]">
          Dr. João Silva
        </Text>
        <Text className="font-interRegular text-[14px] text-[#94A3B8]">
          OAB/SP 432.109
        </Text>
      </View>

      <View className="flex flex-col items-start gap-3 w-full ">
        <View className="flex flex-row gap-2 justify-center">
          <MaterialIcons name="work" color={"#1152D4"} size={20} />
          <Text className="text-[16px] font-interSemiBold text-white">
            Especialidades
          </Text>
        </View>
        <View className="flex flex-row gap-3 items-center p-3 bg-[#1152D4]/5 rounded-lg w-full border border-[#fff]/10">
          <View className="flex items-center justify-center p-2 bg-[#1152D4]/15 rounded-lg">
            <MaterialIcons name="gavel" color={"#1152D4"} size={24} />
          </View>
          <Text className="text-white text-[14px] font-interSemiBold">
            Direito do consumidor
          </Text>
        </View>
      </View>
      <View className="flex flex-col p-6 items-start gap-6 w-full bg-[#1152D4]/5 border border-[#FFFFFF]/10 rounded-lg">
        <View className="flex flex-row gap-1 items-center pb-4 border-b border-b-[#FFFFFF]/10 w-full">
          <MaterialIcons name="location-on" color={"#1152D4"} size={20} />
          <Text className="text-[#1152D4] text-[14px] font-inter">
            São Paulo
          </Text>
        </View>
        <View className="flex flex-col items-start gap-2">
          <Text className="text-[#1152D4] text-[14px] font-interSemiBold">
            SOBRE
          </Text>
          <Text className="text-[#fff] text-[14px] font-interRegular">
            Especialista em Direito Civil e do Consumidor com mais de 12 anos de
            experiência em litígios complexos. Foco em resoluções ágeis e
            atendimento humanizado para garantir os direitos do cidadão.
          </Text>
        </View>
      </View>
      <ButtonUI
        children={
          <View className="justify-center items-center flex-1 flex-row gap-2">
            <Text className="text-white font-interSemiBold text-[16px]">
              Solicitar serviço
            </Text>
          </View>
        }
        onPress={() => router.push("/screens/citizen/chat/lawyerList/lawyerSelected/requestConcluded")}
        gradient={true}
        hover={false}
        iconLeft={false}
        paddingButtonStatus={""}
      />
    </SafeAreaView>
  );
}
