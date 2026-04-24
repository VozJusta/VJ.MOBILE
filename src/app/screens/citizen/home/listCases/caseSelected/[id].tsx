import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import ButtonUI from "@/ui/ButtonUI";
import { useLocalSearchParams } from "expo-router";
import Report from "@/assets/svg/reportIcon.svg";
import { IGetReportDetailsResponse } from "@/interfaces/services/dashboard/citizen/reports/detailsReport";
import { useEffect, useState } from "react";
import { useDashboardCitizen } from "@/hooks/dashboard/citizen/useDashboardCitizen";
import {
  getCategoryLabel,
  translateStatus,
} from "@/utils/screens/citizen/home";
import Header from "@/components/Header";
import { downloadReportAsPdf } from "@/services/dashboard/citizen/reports/dowloadPdf";
import ContactCard from "@/components/ContactCard";
import { TCaseStatus } from "@/interfaces/components/CaseCard";
import DocCard from "@/components/DocCard";
import EmptyState from "@/components/EmptyState";
import Skeletons from "@/components/Skeletons";

export default function CaseSelected() {
  const local = useLocalSearchParams<{ id?: string | string[] }>();
  const [reportData, setReportData] = useState<
    IGetReportDetailsResponse | undefined
  >(undefined);
  const { getDetailsReportById } = useDashboardCitizen();

  const [loading, setLoading] = useState<boolean>(false);

  const reportId = Array.isArray(local.id) ? local.id[0] : local.id;
  useEffect(() => {
    async function load() {
      if (!reportId) return;

      setLoading(true);

      try {
        const data = await getDetailsReportById(reportId);
        if (data) {
          setReportData(data);
        }
      } finally {
        setLoading(false);
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
    <Skeletons height={220} amountOfSkeletons={2} />
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
                  reportData?.user.report.status as TCaseStatus,
                ).toUpperCase()}
            </Text>
            <View className="w-[12px] h-[12px] rounded-full bg-[#2563EB]"></View>
          </View>
          <Text className="text-[14px] text-[#94A3B8] font-interRegular">
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
          <View className="flex-row justify-between items-center w-full">
            <Text className="uppercase text-[14px] font-interSemiBold text-[#94A3B8]">
              Documentos
            </Text>
            <Text className=" text-[12px] font-inter text-[#2563EB]">
              {Object.keys(reportData?.user.report.evidence).length} anexos
            </Text>
          </View>
          {Object.keys(reportData?.user.report.evidence).length === 0 ? (
            <EmptyState
              icon="folder-off"
              title="Nenhum documento anexado"
              description="Você não anexou nenhum documento a este caso."
            />
          ) : (
            <View className="flex-col gap-[8px]">
              <DocCard
                nameFile="Contrato_aluguel"
                date="14 Out 2023"
                size="14MB"
              />
            </View>
          )}

          <Text className="uppercase text-[14px] font-interSemiBold text-[#94A3B8]">
            CONTATO DO ADVOGADO
          </Text>
          {Object.keys(reportData?.user.report.lawyer || {}).length > 0 &&
          reportData?.user.report.lawyer ? (
            <ContactCard
              name={reportData.user.report.lawyer.full_name}
              email={reportData.user.report.lawyer.email}
              phone={reportData.user.report.lawyer.phone}
            />
          ) : (
            <EmptyState
              icon="person-off"
              title="Contato não disponível"
              description="As informações de contato do advogado não estão disponíveis no momento."
            />
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
