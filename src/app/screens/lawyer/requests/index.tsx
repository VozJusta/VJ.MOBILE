import { View, Text, FlatList, TouchableOpacity } from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";

export default function RequestsScreens() {
  const [selectedFilter, setSelectedFilter] = useState<TCaseStatus | "">("");
  const [isDownloading, setIsDownloading] = useState(false);
  const {
    fetchRequests,
    loading,
    requests,
    handleRequestAction,
    actionLoading,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    page
  } = useLawyerRequests();

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

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

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
            onSeeReport={() => handleDownloadReport(item.reportId)}
            onAccept={() => handleRequestAction(item.id, "accept")}
            onReject={() => handleRequestAction(item.id, "reject")}
            reportId={item.reportId}
            caseId={item.caseId}
            isAccepting={actionLoading === `${item.id}-accept`}
            isRejecting={actionLoading === `${item.id}-reject`}
          />
        )}
        contentContainerClassName="gap-8 pb-6"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading && requests.length > 0 ? (
            <Skeletons amountOfSkeletons={1} height={50} />
          ) : requests.length > 0 && totalPages > 1 ? (
            <View className="flex-row items-center justify-between w-full mt-4 bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[16px] px-[16px] py-[12px]">
              <TouchableOpacity
                onPress={goToPreviousPage}
                disabled={!hasPreviousPage || loading}
                className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                  hasPreviousPage && !loading
                    ? "bg-white/5 border border-solid border-white/10"
                    : "bg-transparent opacity-30"
                }`}
              >
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>

              <View className="flex-row items-center gap-3">
                {pageNumbers.map((num) => (
                  <TouchableOpacity
                    onPress={() => goToPage(num)}
                    key={num}
                    disabled={loading}
                    className={`w-[40px] h-[40px] rounded-[12px] justify-center items-center ${
                      page === num
                        ? "bg-[#2563EB]"
                        : "bg-white/5 border border-solid border-white/10"
                    } ${loading ? "opacity-50" : ""}`}
                  >
                    <Text
                      className={`font-interBold text-[16px] ${page === num ? "text-white" : "text-[#94A3B8]"}`}
                    >
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}

                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <Text className="text-[#94A3B8] font-interBold text-[16px]">
                    ...
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={goToNextPage}
                disabled={!hasNextPage || loading}
                className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
                  hasNextPage && !loading
                    ? "bg-[#2563EB]"
                    : "bg-transparent opacity-30 border border-solid border-white/10"
                }`}
                style={
                  hasNextPage &&
                  !loading && {
                    shadowColor: "#1E3A8A",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 8,
                  }
                }
              >
                <MaterialIcons name="chevron-right" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null
        }
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
