import { View, Text } from "react-native";
import React from "react";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import { AnalysysConcludedProbability } from "@/interfaces/template/analysysConcludedTemplate";
import { useRouter } from "expo-router";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";

export default function AnalysysConcluded() {
  const router = useRouter();

  return (
    <AnalysysConcludedTemplate
      title="Análise Concluída!"
      description="Nossa IA processou seu relato e
documentos com sucesso. Seu
diagnóstico jurídico está pronto
para visualização."
      category="Direito do consumidor"
      probability={AnalysysConcludedProbability.HIGH}
      extraActions={
        <View className="flex flex-col gap-8 w-full">
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
          <ButtonUI
            children={
              <View className="justify-center items-center flex-1 flex-row gap-2">
                <Text className="text-white font-interSemiBold text-[16px]">
                  Ir para a página inicial
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
