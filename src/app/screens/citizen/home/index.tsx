import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import Person from "@/assets/svg/icons/person.svg";
import { useRouter } from "expo-router";
import { casesData } from "@/utils/home/cases/data";
import { IDecodedToken } from "@/interfaces/services/token/token";
import Header from "@/components/Header";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";
import CaseCard from "@/components/CaseCard";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import {
  getCategoryLabel,
  getStatusIcon,
  translateStatus,
} from "@/utils/screens/citizen/home";

export default function Home() {
  const router = useRouter();
  const token = useAccessTokenStorage((state) => state.accessToken);
  if (token === null) {
    router.push("/screens/auth/users/SignIn");
    return null;
  }
  const decodedToken = jwtDecode<IDecodedToken>(token);

  const { loading, reports } = useDashboard(3);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 84 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="gap-8">
        <Header isFirstPage={true} title="CIDADÃO" isCitizen={true} />

        <View className="mt-[32px] gap-[4px]">
          <Text className="font-interBold text-[30px] text-white">
            Olá, {decodedToken.fullName}!
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
            <ActivityIndicator size="large" color="#2563EB" className="mt-4" />
          ) : reports.length === 0 ? (
            <Text className="text-white text-[16px] font-interSemiBold">
              Você não tem casos registrados.
            </Text>
          ) : (
            reports.map((report) => (
              <CaseCard
                key={report.id}
                iconName={getStatusIcon(report.status)}
                onPress={() => {}}
                status={translateStatus(report.status)}
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
              <Person width={24} height={24} />
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
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
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
