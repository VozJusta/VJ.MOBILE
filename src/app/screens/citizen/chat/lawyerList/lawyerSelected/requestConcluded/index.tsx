import { View, Text } from "react-native";
import React from "react";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

export default function RequestConcluded() {
  return (
    <AnalysysConcludedTemplate
      title="Dossiê técnico enviado!"
      description="O Dr. Ricardo Silveira recebeu sua
análise. Assim que ele aceitar o caso,
você receberá o contato direto via
WhatsApp."
      firstCardProps={{
        title: "PRAZO DE RESPOSTA",
        description: "No mínimo 72 horas",
      }}
      secondCardProps={{
        title: "ADVOGADO DESIGNADO",
        description: "Dr. Ricardo Silveira",
      }}
      extraActions={
        <View className="flex flex-col gap-8 w-full mt-6">
          <ButtonUI
            children={
              <View className="justify-center items-center flex-1 flex-row gap-2">
                <MaterialIcons name="home" size={24} color="#ffffff" />

                <Text className="text-white font-interSemiBold text-[16px]">
                  Ir para a página inicial
                </Text>
              </View>
            }
            onPress={() => router.push("/screens/citizen/home/")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />

          <ButtonUI
            children={
              <View className="justify-center items-center flex-1 flex-row gap-2">
                <MaterialIcons name="analytics" size={24} color="#ffffff" />
                <Text className="text-white font-interSemiBold text-[16px]">
                  Baixar relatório
                </Text>
              </View>
            }
            onPress={() => router.push("/screens/citizen/home/conversation")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
        </View>
      }
    />
  );
}
