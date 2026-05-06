import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";
import CaseCard from "@/components/CaseCard";
import { getCategoryLabel, getStatusIcon } from "@/utils/screens/citizen/home";
import { useEffect } from "react";
import { IDecodedToken } from "@/interfaces/shared/decodedToken";
import { useDashboardCitizen } from "@/hooks/dashboard/citizen/useDashboardCitizen";
import EmptyState from "@/components/EmptyState";
import Skeletons from "@/components/Skeletons";

export default function Home() {
  const router = useRouter();
  const token = useAccessTokenStorage((state) => state.accessToken);
  const { loading, reports } = useDashboardCitizen();

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
    }
  }, [token]);

  if (!token) return null;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 84 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="gap-8">
        <Header isFirstPage={true} title="CIDADÃO" isCitizen={true} />

        <View className="mt-[32px] gap-[4px]">
          <Text className="font-interBold text-[30px] text-white">
            Olá, {decodedToken?.fullName || "Cidadão"}!
          </Text>
          <Text className="text-[16px] text-[#94A3B8] font-interLight">
            Bem-vindo ao seu painel jurídico.
          </Text>
        </View>
        <View className="w-full h-[219.52px] bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[12px] mt-[32px] px-[16px] pt-[32px] gap-[6.9px] pb-[24px]">
          <Text className="text-[20px] text-white font-interSemiBold">
            Novo Problema Jurídico?
          </Text>
          <Text className="text-[14px] mb-[18px] text-[#94A3B8] font-interRegular">
            Nossos especialistas estão prontos para analisar seu caso agora
            mesmo.
          </Text>
          <ButtonUI
            children={
              <View className="px-[24px] py-[16px] justify-between items-center flex-row gap-[8px] h-full">
                <Text className="text-white font-interSemiBold text-[14px]">
                  Relatar Novo Caso
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </View>
            }
            onPress={() => router.push("/screens/citizen/chat")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
        </View>
        <View className="gap-[16px] items-center w-full">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-white text-[18px] font-interSemiBold">
              Meus Casos
            </Text>
            <Text
              className="font-inter text-[14px] text-[#2563EB]"
              onPress={() => router.push("/screens/citizen/home/listCases")}
            >
              Ver todos
            </Text>
          </View>

          {loading ? (
            <Skeletons height={220} amountOfSkeletons={1} />
          ) : reports.length === 0 ? (
            <EmptyState
              icon="gavel"
              title="Nenhum caso por aqui"
              description="Você ainda não iniciou nenhum relato jurídico."
            />
          ) : (
            reports.map((report) => (
              <CaseCard
                key={report.id}
                iconName={getStatusIcon(report.status)}
                onPress={() => {}}
                status={report.status}
                title={getCategoryLabel(report.category_detected)}
              />
            ))
          )}
        </View>
        <View className="rounded-3xl bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] h-fit p-6 w-full gap-[24px]">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-[18px] text-white font-interBold">
                Simulador de Audiência
              </Text>
              <Text className="text-[12px] w-[200px] mb-[16px] text-[#94A3B8] font-interRegular">
                Treine seu depoimento com nossa IA antes do dia oficial.
              </Text>
            </View>
            <View className="justify-center rounded-full items-center flex bg-[rgba(255,255,255,0.05)] w-[48px] h-[48px]">
              <MaterialIcons name="psychology" size={24} color={"#818CF8"} />
            </View>
          </View>
          <ButtonUI
            children={
              <View className=" justify-center items-center flex-1">
                <Text className="text-white font-interSemiBold text-[16px]">
                  Começar treinamento
                </Text>
              </View>
            }
            onPress={() => router.push("/screens/citizen/simulation")}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
