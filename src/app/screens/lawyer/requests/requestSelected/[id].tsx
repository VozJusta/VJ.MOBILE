import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestsCards } from "../data";
import RequestCard from "@/components/RequestCard";
import { requestSelectedAnalysysData } from "./data";
import AnalysysCard from "@/components/AnalysysCard";
import ContactCard from "@/components/ContactCard";

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
        <View className="gap-3 my-8">
          <Text className="font-interBold text-[28px] text-white">
            Detalhes da solicitação
          </Text>
          <Text className="text-[16px] text-[#94A3B8] font-interLight">
            Aqui estão todas as informações sobre a solicitação feita para você.
            Caso aceite a solicitação, o dossiê do caso será aberto e você
            poderá acessar todas as informações e documentos relacionados ao
            caso.
          </Text>
        </View>

        <RequestCard {...requestSelected[0]} />
        <Text className="font-interSemiBold text-[20px] text-white">
          Análise Jurídica da IA
        </Text>
        {requestSelectedAnalysysData.map((analysys, index) => (
          <AnalysysCard key={index} {...analysys} />
        ))}
        <ContactCard
          nameCitizen={requestSelected[0].nameCitizen}
          phone="(11) 98765-4321"
          email="exemplo@gmail.com"
        />
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
