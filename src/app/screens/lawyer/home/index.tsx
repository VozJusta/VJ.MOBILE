import { ProductivityChart } from "@/interfaces/components/ProductivityChart";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { lawyerStats } from "./data";
import StatsCard from "@/components/StatsCard";
import OperationalStats from "@/components/OperationalStats";
import ImportantRequestCard from "@/components/ImportantRequestCard";
import { useDashboardLawyer } from "@/hooks/dashboard/lawyer/useDashboardLawyer";
import { getCategoryLabel } from "@/utils/screens/citizen/home";
import { useAuth } from "@/hooks/auth/useAuth";
import { IDecodedToken } from "@/interfaces/services/token/token";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { router } from "expo-router";

export default function LawyerHome() {
  const token = useAccessTokenStorage((state) => state.accessToken);
  const { loading, analyticsData, operationalStats, highRelevanceCases } =
    useDashboardLawyer();
  const { authMe, user } = useAuth();
  const chartData = analyticsData?.data || [];

  let decodedToken: IDecodedToken | null = null;
   if (token) {
     try {
       decodedToken = jwtDecode<IDecodedToken>(token);
     } catch {
       decodedToken = null;
     }
   }
 
   useEffect(() => {
     if (!token) {
       router.replace("/screens/Onboarding/roles");
     } else {
       authMe();
     }
   }, [token]);
 
 
   if (!token) return null;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className="flex-1 gap-6">
        <Header isFirstPage={true} title="ADVOGADO" isCitizen={false} />

        {loading || !analyticsData || !operationalStats || !highRelevanceCases ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            <View className="mt-[32px] gap-3">
              <Text className="font-interBold text-[30px] text-white">
                Olá, {user?.full_name}!
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
              <OperationalStats
                accepted={operationalStats?.accepted}
                pending={operationalStats?.pending}
                refused={operationalStats?.refused}
              />
            </View>
            <View className="flex flex-col gap-6">
              <Text className="text-white text-[20px] font-interBold">
                Solicitações relevantes
              </Text>
              <View className="flex flex-col gap-3">
                {highRelevanceCases.map((request, index) => (
                  <ImportantRequestCard
                    key={index}
                    {...request}
                    textBadge={getCategoryLabel(request.category_detected)}
                    badgeColor={
                      request.status === "accepted"
                        ? "#34D399"
                        : request.status === "pending"
                          ? "#F59E0B"
                          : "#EF4444"
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
