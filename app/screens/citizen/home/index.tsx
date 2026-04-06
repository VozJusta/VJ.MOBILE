import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, Alert } from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import Person from "@/assets/svg/icons/person.svg";
import { useRouter } from "expo-router";
import { casesData } from "@/utils/home/cases/data";
import { jwtDecode,JwtPayload } from "jwt-decode";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/token.store";
import { IDecodedToken } from "@/interfaces/services/token/token";

export default function Home() {
  const router = useRouter();
  const token = useAccessTokenStorage((state) => state.accessToken);
  if (token === null) {
    Alert.alert("Token de acesso não encontrado");
    router.replace("/screens/auth/login");
    return null;
  }

  console.log("Access Token:", token);
  Alert.alert("Token de acesso encontrado: " + token);
  const decodedToken = jwtDecode<IDecodedToken>(token);

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-[32px]">
        <View className="w-full justify-between flex-row items-center">
          <Logo width={40} height={29} />
          <Text className="font-interBold text-[10px] text-[#94A3B8]">
            CIDADÃO
          </Text>
          <View className="min-w-[40px] min-h-[40px] rounded-full justify-center items-center bg-[rgba(37,99,235,0.2)] border border-solid border-[rgba(37,99,235,0.3)]">
            <MaterialIcons name="notifications" size={20} color="#2563EB" />
          </View>
        </View>
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
              <View className="px-[24px] py-[16px] justify-between items-center flex-row gap-[8px]">
                <Text className="text-white font-interSemiBold text-[14px]">
                  Relatar Novo Caso
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </View>
            }
            onPress={() => router.replace("/screens/citizen/home/newRequest")}
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
            <ButtonUI
              onPress={() => router.replace("/screens/citizen/home/listCases")}
              children={
                <Text className="font-inter text-[14px] text-[#2563EB]">
                  Ver todos
                </Text>
              }
              gradient={false}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            />
          </View>
          {casesData.slice(0, 2).map((item) => (
            <ButtonUI
              key={item.id}
              onPress={() =>
                router.replace(
                  `/screens/citizen/home/listCases/caseSelected/${item.id}`,
                )
              }
              gradient={false}
              hover={false}
              iconLeft
              iconName={item.icon}
              status={item.status}
              colorsStatus={item.color}
              children={<Text>{item.title}</Text>}
              paddingButtonStatus={"p-[16px]"}
            />
          ))}
        </View>
        <View
          style={{
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.03)",
            paddingVertical: 24,
            paddingHorizontal: 24,
            marginBottom: 128,
          }}
        >
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
