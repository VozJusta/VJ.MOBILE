import { useState } from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { simulationPersonalities } from "@/utils/screens/citizen/simulation";
import CategoryCard from "@/components/CategoryCard";
import ButtonUI from "@/ui/ButtonUI";

export default function SimulationScreen() {
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 128 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="gap-8">
        <Header
          isFirstPage={true}
          title="PERSONALIDADE DA IA"
          isCitizen={true}
        />
        <View className="gap-3 mt-8">
          <Text className="font-interBold text-[30px] text-white">
            Simulação de audiência
          </Text>
          <Text className="text-[16px] text-[#94A3B8] font-interLight">
            Escolha a personalidade da IA para simular uma audiência jurídica e pratique seus argumentos.
          </Text>
        </View>
        {simulationPersonalities.map((personality, index) => (
          <CategoryCard {...personality} key={index} onPress={() => {}} />
        ))}

        <ButtonUI
          children={
            <View className="justify-center items-center flex-1">
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-interSemiBold text-[16px]">
                  Inciar simulação
                </Text>
              )}
            </View>
          }
          onPress={() => {}}
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
