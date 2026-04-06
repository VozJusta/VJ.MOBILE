import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
import RequestCard from "@/components/RequestCard";
import { requestsCards } from "./data";

export default function RequestsScreens() {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={requestsCards}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <RequestCard {...item} />}
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
            <Filters />
          </>
        }
      />
    </SafeAreaView>
  );
}
