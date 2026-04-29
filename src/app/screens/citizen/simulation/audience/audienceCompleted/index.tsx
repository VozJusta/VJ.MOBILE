import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import ButtonUI from "@/ui/ButtonUI";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AudienceCompleted() {
  return (
    <AnalysysConcludedTemplate
      title="Análise Concluída!"
      titleHeader="Análise Concluída"
      description="Nossa IA processou seu relato com sucesso. Seu
diagnóstico jurídico está pronto
para visualização."
      extraActions={
        <View className="flex flex-col gap-8 w-full">
          <ButtonUI
            children={
              <View className="justify-center items-center flex-1 flex-row gap-2">
                {isDownloading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <MaterialIcons name="analytics" size={24} color="#ffffff" />
                    <Text className="text-white font-interSemiBold text-[16px]">
                      Baixar relatório
                    </Text>
                  </>
                )}
              </View>
            }
            onPress={handleDownloadReport}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
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
        </View>
      }
    />
  );
}
