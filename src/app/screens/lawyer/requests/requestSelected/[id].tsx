import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestsCards } from "../data";
import RequestCard from "@/components/RequestCard";
import { requestSelectedAnalysysData } from "./data";
import AnalysysCard from "@/components/AnalysysCard";

export default function RequestSelected() {
  const { id } = useLocalSearchParams();

  const requestSelected = requestsCards.filter((request) => request.id === id);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 gap-6">
        <Header
          title={requestSelected[0].nameCase.toUpperCase()}
          isFirstPage={false}
          isCitizen={false}
        />

        <RequestCard {...requestSelected[0]} />

        <Text className="font-interSemiBold text-[20px] text-white">
          Análise Jurídica da IA
        </Text>

        {requestSelectedAnalysysData.map((analysys, index) => (
          <AnalysysCard key={index} {...analysys} />
        ))}

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Parâmetros da solicitação",
              JSON.stringify(requestSelected[0]),
            )
          }
          className="mt-4 px-4 py-2 bg-[#2B86EE] rounded-lg"
        >
          <Text className="text-white font-interSemiBold">Ver parametros</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}
