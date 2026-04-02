import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import {
  RequestCardBadgeColor,
  RequestCardProps,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";
import RequestCard from "@/components/RequestCard";

export const requestsCards: RequestCardProps[] = [
  {
    area: "Direito Civil",
    badgeColor: RequestCardBadgeColor.PENDING,
    textBadge: RequestCardTextBadge.PENDING,
    nameCase: "Ricardo Silva vs. João Pereira",
    nameCitizen: "Ricardo Silva",
    requestDate: "12/09/2024",
  },
  {
    area: "Direito Penal",
    badgeColor: RequestCardBadgeColor.ACCEPTED,
    textBadge: RequestCardTextBadge.ACCEPTED,
    nameCase: "Maria Oliveira vs. Carlos Souza",
    nameCitizen: "Maria Oliveira",
    requestDate: "10/09/2024",
  },
  {
    area: "Direito Trabalhista",
    badgeColor: RequestCardBadgeColor.REJECTED,
    textBadge: RequestCardTextBadge.REJECTED,
    nameCase: "Ana Costa vs. Empresa XYZ",
    nameCitizen: "Ana Costa",
    requestDate: "08/09/2024",
  },
];

export default function RequestsScreens() {
  return (
    <SafeAreaView className="flex-1 gap-6">
      <Header isFirstPage={true} title="SOLICITAÇÕES" isCitizen={false} />
      <View className="mt-[32px] gap-3">
        <Text className="font-interBold text-[30px] text-white">
          Solicitações para você
        </Text>
        <Text className="text-[16px] text-[#94A3B8] font-interLight">
          Aqui estão todas as solicitações feitas para você, as pendentes,
          aceitas e recusadas. Para saber mais sobre o caso, clique no nome do
          caso.
        </Text>
      </View>

      <Filters />

      <FlatList
        data={requestsCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RequestCard {...item} />}
        contentContainerClassName="flex flex-col gap-3"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
