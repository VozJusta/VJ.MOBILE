import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import { useRouter } from "expo-router";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { useChatStorage } from "@/store/chat/chat.store";
import { downloadReportAsPdf } from "@/services/dashboard/citizen/reports/dowloadPdf";

export default function AnalysysConcluded() {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const { reportId } = useChatStorage();

  const handleDownloadReport = async () => {
    if (!reportId) return;

    try {
      setIsDownloading(true);

      await downloadReportAsPdf(reportId);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnalysysConcludedTemplate
      title="Análise Concluída!"
      titleHeader="Análise Concluída"
      description="Nossa IA processou seu relato e
documentos com sucesso. Seu
diagnóstico jurídico está pronto
para visualização."
      firstCardProps={{
        title: "CATEGORIA",
        description: "Direito do Consumidor",
      }}
      secondCardProps={{
        title: "VIABILIDADE",
        description: "Alta probabilidade",
      }}
      extraActions={
        <View className="flex flex-col gap-8 w-full">
          <ButtonUI
            onPress={handleDownloadReport}
            gradient={true}
            hover={false}
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
            onPress={() => router.push("/screens/citizen/chat/lawyerList")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          >
            <View className="justify-center items-center flex-1 flex-row gap-2">
              <MaterialIcons name="balance" size={24} color="#ffffff" />
              <Text className="text-white font-interSemiBold text-[16px]">
                Lista de advogados
              </Text>
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
