import { ProductivityChart } from "@/interfaces/components/ProductivityChart";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { lawyerRequests, lawyerStats } from "./data";
import StatsCard from "@/components/StatsCard";
import OperationalStats from "@/components/OperationalStats";
import RequestCard from "@/components/RequestCard";
import { useState } from "react";
import FilterStatus from "@/components/FilterStatus";
import { StatusText } from "@/interfaces/components/FilterStatus";
import Filters from "@/components/Filters";


export default function LawyerHome() {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 gap-6">
        <Filters />
        <Header isFirstPage={true} title="ADVOGADO" isCitizen={false} />
        <View className="mt-[32px] gap-[4px]">
          <Text className="font-interBold text-[30px] text-white">
            Olá, Ricardo!
          </Text>
          <Text className="text-[16px] text-[#94A3B8] font-interLight">
            Bem-vindo ao seu painel jurídico.
          </Text>
        </View>

        <View className="flex flex-col bg-[#161E29]/70 border border-[#2B86EE]/20 gap-8 rounded-3xl p-8">
          <View className="flex flex-row items-center gap-2">
            <MaterialIcons name="insights" size={24} color="#2B86EE" />
            <Text className="text-white text-[20px] font-interBold">
              Análise de produtividade
            </Text>
          </View>
          <ProductivityChart
            data={[
              { date: "01", value: 20 },
              { date: "02", value: 45 },
              { date: "03", value: 28 },
              { date: "04", value: 80 },
              { date: "05", value: 99 },
              { date: "06", value: 43 },
              { date: "07", value: 65 },
            ]}
          />
        </View>
        <View className="flex flex-col gap-6">
          <Text className="text-white text-[20px] font-interBold">
            Resumo geral
          </Text>
          {lawyerStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </View>
        <View className="flex flex-col gap-6">
          <Text className="font-interBold text-white text-[18px]">
            Status operacional dos casos
          </Text>
          <OperationalStats />
        </View>
        <View className="flex flex-col gap-6">
          <Text className="text-white text-[20px] font-interBold">
            Solicitações relevantes
          </Text>
          <View className="flex flex-col gap-3">
            {lawyerRequests.map((request, index) => (
              <RequestCard key={index} {...request} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
