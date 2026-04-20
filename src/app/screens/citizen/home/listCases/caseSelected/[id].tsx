import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import ButtonUI from "@/ui/ButtonUI";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Report from "@/assets/svg/reportIcon.svg";
import { IGetReportDetailsResponse } from "@/interfaces/services/dashboard/reports/detailsReport";
import { useEffect, useState } from "react";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import {
  getCategoryLabel,
  translateStatus,
} from "@/utils/screens/citizen/home";
import Header from "@/components/Header";
import { useChatStorage } from "@/store/chat/chat.store";
import { downloadReportAsPdf } from "@/services/dashboard/reports/dowloadPdf";
import ContactCard from "@/components/ContactCard";
import { CaseStatus } from "@/interfaces/components/CaseCard";

export default function CaseSelected() {
  const router = useRouter();
  const local = useLocalSearchParams<{ id?: string | string[] }>();
  const [reportData, setReportData] = useState<
    IGetReportDetailsResponse | undefined
  >(undefined);
  const { getDetailsReportById, loading } = useDashboard();

  const reportId = Array.isArray(local.id) ? local.id[0] : local.id;
  useEffect(() => {
    async function load() {
      if (!reportId) return;

      const data = await getDetailsReportById(reportId);

      if (data) {
        setReportData(data);
      }
    }

    load();
  }, [local.id]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    if (!reportId) return;

    try {
      setIsDownloading(true);

      await downloadReportAsPdf(reportId);
    } finally {
      setIsDownloading(false);
    }
  };

  return loading || !reportData ? (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: 20, gap: 24 }}>
        <Header
          isFirstPage={false}
          title={
            reportData
              ? getCategoryLabel(
                  reportData.user.report.category_detected,
                ).toUpperCase()
              : ""
          }
          isCitizen
        />
        <View className="py-[24px] pl-[24px] gap-2 pr-[37px] bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">
          <Text className="text-[14px] font-interSemiBold text-[#2563EB]">
            STATUS ATUAL
          </Text>
          <View className="flex-row gap-[8px] items-center justify-between">
            <Text className="text-[24px] font-interBold text-white">
              {reportData &&
                translateStatus(
                  reportData?.user.report.status as CaseStatus,
                ).toUpperCase()}
            </Text>
            <View className="w-[12px] h-[12px] rounded-full bg-[#2563EB]"></View>
          </View>
          <Text className="text-[14px] text-[#94A3B8] w-[] font-interRegular">
            {Object.keys(reportData?.user.report.lawyer || {}).length > 0
              ? reportData?.user.report.transcription
              : "Seu caso ainda está sendo analisado por nossos especialistas. Assim que um advogado for designado para o seu caso, você terá acesso a mais detalhes e orientações específicas."}
          </Text>
        </View>
        <View className="flex-col gap-[16px]">
          <Text className="text-[14px] text-[#94A3B8] uppercase font-interSemiBold">
            ANÁLISE TÉCNICA DA IA
          </Text>
          <View className="p-5 bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">
            <Text className="text-[14px] font-interRegular text-white">
              {reportData?.user.report.legal_analysis}
            </Text>
          </View>
          <View className="flex-col gap-[16px]">
            <Text className="text-[14px] text-[#94A3B8] font-interSemiBold">
              RESUMO DO RELATO
            </Text>
            <View className="p-5 border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.7)] rounded-[16px] justify-center items-center">
              <Text className="font-interRegular text-[14px] text-white">
                {reportData?.user.report.simplified_explanation}
              </Text>
            </View>
          </View>
          {/* <View className="flex-row justify-between items-center w-full">
              <Text className="uppercase text-[14px] font-interSemiBold text-[#94A3B8]">
                Documentos
              </Text>
              <Text className=" text-[12px] font-inter text-[#2563EB]">
                4 anexos
              </Text>
            </View>
            <View className="flex-col gap-[8px]">
              <DocCard
                nameFile="Contrato_aluguel"
                date="14 Out 2023"
                size="14MB"
              />
              <DocCard
                nameFile="Screenshot_Ponto"
                date="14 Out 2023"
                size="840KB"
              />
            </View> */}

          {Object.keys(reportData?.user.report.lawyer || {}).length > 0 &&
          reportData?.user.report.lawyer ? (
            <ContactCard
              name={reportData.user.report.lawyer.full_name}
              email={reportData.user.report.lawyer.email}
              phone={reportData.user.report.lawyer.phone}
            />
          ) : (
            <View className="flex flex-col items-start gap-[8px]">
              <Text className="text-[14px] text-[#94A3B8] font-interSemiBold">
                CONTATO DO ADVOGADO
              </Text>
              <View className="p-5 flex flex-col border border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.7)] rounded-[16px] justify-center items-center">
                <Text className="font-interRegular text-[14px] text-white">
                  Nenhum advogado foi designado para este caso ainda.
                </Text>
              </View>
            </View>
          )}

          <View className="w-full mt-[9px] mb-[24px]">
            <ButtonUI
              onPress={handleDownloadReport}
              children={
                <View className="flex-1 justify-center items-center gap-[8px] flex-row">
                  {isDownloading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Report width={24} height={24} />
                      <Text className="font-interSemiBold text-[16px] text-white">
                        Baixar Relatório
                      </Text>
                    </>
                  )}
                </View>
              }
              gradient={true}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
