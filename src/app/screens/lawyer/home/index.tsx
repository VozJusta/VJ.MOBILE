import { ProductivityChart } from "@/interfaces/components/ProductivityChart";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { lawyerRequests, lawyerStats } from "./data";
import StatsCard from "@/components/StatsCard";
import OperationalStats from "@/components/OperationalStats";
import ImportantRequestCard from "@/components/ImportantRequestCard";
import { useDashboardLawyer } from "@/hooks/dashboard/lawyer/useDashboardLawyer";

export default function LawyerHome() {
  const { loading, analyticsData } = useDashboardLawyer();
  const chartData = analyticsData?.data || [];

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 gap-6">
        <Header isFirstPage={true} title="ADVOGADO" isCitizen={false} />

        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            <View className="mt-[32px] gap-3">
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
              <ProductivityChart data={chartData} />
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
                  <ImportantRequestCard key={index} {...request} />
                ))}
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
