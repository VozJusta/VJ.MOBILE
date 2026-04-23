import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RequestCard from "@/components/RequestCard";
import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { useLawyerRequests } from "@/hooks/lawyer/requests/useLawyerRequests";
import EmptyState from "@/components/EmptyState";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import {
  RequestCardBadgeColor,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";

export default function RequestsScreens() {
  const [selectedFilter, setSelectedFilter] = useState<TCaseStatus | "">("");
  const { fetchRequests, loading, requests } = useLawyerRequests();

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFilterChange = (filter: TCaseStatus | "") => {
    setSelectedFilter(filter);

    fetchRequests(filter || undefined);
  };

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={requests}
        keyExtractor={(item, index) => item.id}
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
            <Filters onFilterChange={handleFilterChange} />
          </>
        }
        ListEmptyComponent={
          loading ? (
            <MotiView
              transition={{
                type: "timing",
              }}
              style={[styles.container, styles.padded]}
              animate={{ backgroundColor: "transparent" }}
            >
              <Skeleton
                width={"100%"}
                height={250}
                radius={25}
                colorMode="dark"
              />
              <Skeleton
                width={"100%"}
                height={250}
                radius={25}
                colorMode="dark"
              />
            </MotiView>
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

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  padded: {
    padding: 16,
  },
});
