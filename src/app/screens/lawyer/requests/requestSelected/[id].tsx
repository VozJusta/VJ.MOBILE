import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestCard from "@/components/RequestCard";
import AnalysysCard from "@/components/AnalysysCard";
import ContactCard from "@/components/ContactCard";
import EvidencesCard from "@/components/EnvidencesCard";
import { useLawyerRequests } from "@/hooks/lawyer/requests/useLawyerRequests";
import {
  RequestCardBadgeColor,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";
import { getCategoryLabel } from "@/utils/screens/citizen/home";
import { IAnalysysCardTitle } from "@/interfaces/components/AnalysysCard";
import EmptyState from "@/components/EmptyState";
import Skeletons from "@/components/Skeletons";

export default function RequestSelected() {
  const { id } = useLocalSearchParams();
  const { fetchRequestById, requestDetails, loading } = useLawyerRequests();

  useEffect(() => {
    if (id) fetchRequestById(id as string);
  }, [id]);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 gap-6">
        <Header
          title={
            loading || !requestDetails
              ? "CARREGANDO..."
              : requestDetails.user.report.title
          }
          isFirstPage={false}
          isCitizen={false}
        />

        {loading || !requestDetails ? (
          <Skeletons amountOfSkeletons={3} height={200} />
        ) : (
          <>
            <View className="gap-3 my-8">
              <Text className="font-interBold text-[28px] text-white">
                Detalhes da solicitação
              </Text>
              <Text className="text-[16px] text-[#94A3B8] font-interLight">
                Aqui estão todas as informações sobre a solicitação feita para
                você. Caso aceite a solicitação, o dossiê do caso será aberto e
                você poderá acessar todas as informações e documentos
                relacionados ao caso.
              </Text>
            </View>
            <RequestCard
              clientName={requestDetails.user.report.citizen.full_name}
              created_at="há 2 dias"
              title={requestDetails.user.report.title || ""}
              category_detected={
                getCategoryLabel(
                  requestDetails.user.report.category_detected,
                ) || ""
              }
              {...requestDetails.user.report}
              textBadge={
                requestDetails.user.report.status === "Accepted"
                  ? RequestCardTextBadge.ACCEPTED
                  : requestDetails.user.report.status === "Refused"
                    ? RequestCardTextBadge.REJECTED
                    : RequestCardTextBadge.PENDING
              }
              badgeColor={
                requestDetails.user.report.status === "Accepted"
                  ? RequestCardBadgeColor.ACCEPTED
                  : requestDetails.user.report.status === "Refused"
                    ? RequestCardBadgeColor.REJECTED
                    : RequestCardBadgeColor.PENDING
              }
            />
            <Text className="font-interSemiBold text-[20px] text-white">
              Análise Jurídica da IA
            </Text>
            <AnalysysCard
              title={IAnalysysCardTitle.FACTS}
              text={requestDetails.user.report.transcription}
            />
            <AnalysysCard
              title={IAnalysysCardTitle.SIMPLIFIED_EXPLANATION}
              text={requestDetails.user.report.simplified_explanation}
            />
            <AnalysysCard
              title={IAnalysysCardTitle.LEGAL_ANALYSIS}
              text={requestDetails.user.report.legal_analysis}
            />
            {requestDetails.user.report.status !== "Accepted" ? (
              <EmptyState
                icon="phone-disabled"
                title="Informações de contato não disponíveis"
                description="Você não aceitou esse caso ainda, após o caso ser aceito, será disponibilizado os dados para contato com o cliente"
              />
            ) : (
              <ContactCard
                name={requestDetails.user.report.citizen.full_name}
                phone={requestDetails.user.report.citizen.phone}
                email={requestDetails.user.report.citizen.email}
              />
            )}
            {/* <EvidencesCard />  */}
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
