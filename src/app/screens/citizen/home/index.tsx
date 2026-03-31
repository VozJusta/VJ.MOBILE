import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "@/ui/ButtonUI";
import Person from "@/assets/svg/icons/person.svg";
import { useRouter } from "expo-router";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  return (
    <ScrollView>
      <SafeAreaView
        style={{ flex: 1 }}
        className="pt-[32px] px-[16px] gap-[32px]"
      >
        <Header isFirstPage={true} title="CIDADÃO" />

        <View className="mt-[32px] gap-[4px]">
          <Text className="font-interBold text-[30px] text-white">
            Olá, Ricardo!
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
            <Text className="font-inter text-[14px] text-[#2563EB]">
              Ver todos
            </Text>
          </View>
          <ButtonUI
            children={
              <Text className="text-white text-[14px] font-inter">
                Ação Trabalhista - XPTO
              </Text>
            }
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            gradient={false}
            hover={false}
            iconLeft={true}
            statusBorder={false}
            status="Em Análise"
            iconName="article"
            paddingButtonStatus={"p-[16px]"}
          />
          <ButtonUI
            children={
              <Text className="text-white text-[14px] font-inter">
                Indenização Danos Morais
              </Text>
            }
            onPress={() => {}}
            gradient={false}
            hover={false}
            iconLeft={true}
            statusBorder={false}
            status="Concluído"
            iconName="verified"
            paddingButtonStatus={"p-[16px]"}
          />
        </View>
        <LinearGradient
          style={{
            borderRadius: 24,
            backgroundColor: "rgba(255,255,255,0.03)",
            height: 225,
            paddingTop: 24,
            paddingHorizontal: 24,
            paddingBottom: 56,
            marginBottom: 128,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          colors={["rgba(49, 46, 129,0.4)", "#312E81"]}
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
        </LinearGradient>
      </SafeAreaView>
    </ScrollView>
  );
}
