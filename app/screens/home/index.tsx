import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import Logo from "../../../assets/svg/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonUI from "../../../ui/ButtonUI";

export default function Home() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex-1 pt-[58px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <SafeAreaView
        style={{ flex: 1 }}
        className="pt-[32px] px-[16px] gap-[32px]"
      >
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
                      children={<View className="px-[24px] py-[16px] justify-between items-center flex-row gap-[8px]">
                          <Text className="text-white font-interSemiBold text-[14px]">
                              Relatar Novo Caso
                          </Text>
                          <MaterialIcons name="arrow-forward" size={20} color="white" />
                      </View>}
                      onPress={function (): void {
                          throw new Error("Function not implemented.");
                      } }
                      gradient={true}
                      hover={false} iconLeft={false} paddingButtonStatus={""}          />
        </View>
        <View className="gap-[16px] items-center w-full">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-white text-[18px] font-interSemiBold">
              Meus Casos
            </Text>
            <ButtonUI
                          children={<Text className="text-[#2563EB] text-[14px] font-inter">
                              Ver todos
                          </Text>}
                          onPress={function (): void {
                              throw new Error("Function not implemented.");
                          } }
                          gradient={false}
                          hover={false} iconLeft={false} paddingButtonStatus={""}            />
          </View>
          
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
