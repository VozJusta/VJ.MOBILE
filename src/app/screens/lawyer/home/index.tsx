import { ProductivityChart } from "@/interfaces/components/ProductivityChart";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export default function LawyerHome() {
  return (
    <SafeAreaView className="flex-1 gap-6">
      <View className="mt-[32px] gap-[4px]">
        <Text className="font-interBold text-[30px] text-white">
          Olá, Ricardo!
        </Text>
        <Text className="text-[16px] text-[#94A3B8] font-interLight">
          Bem-vindo ao seu painel jurídico.
        </Text>
      </View>
      <BlurView
        className="flex flex-col bg-[#161E29]/70 border-1 border-[#2B86EE]/20 gap-8 rounded-3xl p-8"
        tint="dark"
        intensity={12}
      >
        <Text className="text-white text-[20px] font-interBold">
          Análise de produtividade
        </Text>
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
      </BlurView>
    </SafeAreaView>
  );
}
