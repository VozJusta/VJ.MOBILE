import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AnalysysConcludedTemplate from "@/template/AnalysysConcludedTemplate";
import ButtonUI from "@/ui/ButtonUI";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useChatStorage } from "@/store/chat/chat.store";
import { useLawyersList } from "@/hooks/citizen/lawyerList/useLawyersList";
import { downloadReportAsPdf } from "@/services/dashboard/citizen/reports/dowloadPdf";

export default function RequestConcluded() {
  const { id } = useLocalSearchParams();
  const { fetchLawyerById, lawyerSelected, loading } =
    useLawyersList();
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

  useEffect(() => {
    if (id) fetchLawyerById(id as string);
  }, [id]);

  return (
    <AnalysysConcludedTemplate
      title="Dossiê técnico enviado!"
      titleHeader="SOLICITAÇÃO FEITA!"
      description={`O Dr. ${loading ? "Carregando..." : lawyerSelected?.full_name || "Advogado"} recebeu sua\nanálise. Assim que ele aceitar o caso,\nvocê receberá o contato direto via\nWhatsApp.`}
      firstCardProps={{
        title: "PRAZO DE RESPOSTA",
        description: "No mínimo 72 horas",
      }}
      secondCardProps={{
        title: "ADVOGADO DESIGNADO",
        description: `Dr. ${loading ? "Carregando..." : lawyerSelected?.full_name || "Advogado"}`,
      }}
      extraActions={
        <View className="flex flex-col gap-8 w-full mt-6">
          <ButtonUI
            onPress={() => router.push("/screens/citizen/home")}
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
        </View>
      }
    />
  );
}

