import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RequestCard from "@/components/RequestCard";
import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { useLawyerRequests } from "@/hooks/lawyer/requests/useLawyerRequests";
import EmptyState from "@/components/EmptyState";
import {
  RequestCardBadgeColor,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";
import { IAmounts } from "@/interfaces/components/Filters";
import Skeletons from "@/components/Skeletons";
import { downloadReportAsPdf } from "@/services/dashboard/citizen/reports/dowloadPdf";

export default function RequestsScreens() {
  const [selectedFilter, setSelectedFilter] = useState<TCaseStatus | "">("");
  const [isDownloading, setIsDownloading] = useState(false);
  const { fetchRequests, loading, requests, handleRequestAction } =
    useLawyerRequests();

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFilterChange = (filter: TCaseStatus | "") => {
    setSelectedFilter(filter);

    fetchRequests(filter || undefined);
  };

  const amounts: IAmounts = {
    total: requests.length,
    Accepted: requests.filter((request) => request.statusCase === "Accepted")
      .length,
    Pending: requests.filter((request) => request.statusCase === "Pending")
      .length,
    Refused: requests.filter((request) => request.statusCase === "Refused")
      .length,
  };

  const handleDownloadReport = async (reportId: string) => {
    if (!reportId) return;

    try {
      setIsDownloading(true);

      await downloadReportAsPdf(reportId);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            {...item}
            textBadge={
              item.statusCase === "Accepted"
                ? RequestCardTextBadge.ACCEPTED
                : item.statusCase === "Refused"
                  ? RequestCardTextBadge.REJECTED
                  : RequestCardTextBadge.PENDING
            }
            badgeColor={
              item.statusCase === "Accepted"
                ? RequestCardBadgeColor.ACCEPTED
                : item.statusCase === "Refused"
                  ? RequestCardBadgeColor.REJECTED
                  : RequestCardBadgeColor.PENDING
            }
            onSeeReport={() => handleDownloadReport(item.id)}
            onAccept={() => handleRequestAction(item.id, "accept")}
            onReject={() => handleRequestAction(item.id, "reject")}
          />
        )}
        contentContainerClassName="gap-8 pb-6"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header isFirstPage={true} title="SOLICITAÇÕES" isCitizen={false} />
            <View className="gap-3 my-8">
              <Text className="font-interBold text-[30px] text-white">
                Solicitações para você
              </Text>
              <Text className="text-[16px] text-[#94A3B8] font-interLight">
                Aqui estão todas as solicitações feitas para você, as pendentes,
                aceitas e recusadas. Para saber mais sobre o caso, clique no
                nome do caso.
              </Text>
            </View>
            <Filters
              onFilterChange={handleFilterChange}
              amounts={amounts}
              statusSelected={selectedFilter || undefined}
            />
          </>
        }
        ListEmptyComponent={
          loading ? (
            <Skeletons amountOfSkeletons={2} height={250} />
          ) : (
            <EmptyState
              icon="folder-off"
              title="Nenhuma solicitação encontrada"
              description="Você ainda não possui solicitações na nossa plataforma. Assim que receber uma solicitação, ela aparecerá aqui."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
