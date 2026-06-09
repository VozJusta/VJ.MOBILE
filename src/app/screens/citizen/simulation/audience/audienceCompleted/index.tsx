import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import ButtonUI from "@/ui/ButtonUI";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { downloadReportSimulationAsPdf } from "@/services/ai/simulation/downloadPdf";
import Toast from "react-native-toast-message";
import { useWebSocketSimulation } from "@/store/simulation/websocket/simulation";

export default function AudienceCompleted() {
  const [isDownloading, setIsDownloading] = useState(false);

  const { simulationReportId } = useWebSocketSimulation();

  const handleDownloadReport = async () => {
    const idToUse = simulationReportId;
    if (!idToUse) {
      Toast.show({
        type: "error",
        text1: "Relatório ainda não está pronto",
        text2: "Por favor, tente novamente em alguns instantes.",
      });
      return;
    }

    try {
      setIsDownloading(true);
      const result = await downloadReportSimulationAsPdf(idToUse);
      if (!result.success) {
        Toast.show({
          type: "error",
          text1: result.fields?.[0] ?? "Erro ao baixar relatório",
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

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
            onPress={handleDownloadReport}
            gradient={true}
            hover={false}
            disabled={isDownloading}
            iconLeft={false}
            paddingButtonStatus={""}
          >
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
          </ButtonUI>
          <ButtonUI
            onPress={() => router.push("/screens/citizen/home/")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          >
            <View className="justify-center items-center flex-1 flex-row gap-2">
              <MaterialIcons name="home" size={24} color="#ffffff" />
              <Text className="text-white font-interSemiBold text-[16px]">
                Ir para a página inicial
              </Text>
            </View>
          </ButtonUI>
        </View>
      }
    />
  );
}
