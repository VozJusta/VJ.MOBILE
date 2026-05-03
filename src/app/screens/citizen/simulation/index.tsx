import { useState } from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import {
  personalityMap,
  simulationPersonalities,
} from "@/utils/screens/citizen/simulation";
import CategoryCard from "@/components/CategoryCard";
import ButtonUI from "@/ui/ButtonUI";
import { router } from "expo-router";
import { useWebSocketSimulation } from "@/store/simulation/websocket";

export default function SimulationScreen() {
  const { createAndStartSimulation, isLoading, error } =
    useWebSocketSimulation();
  const [selected, setSelected] = useState<string | null>(null);

  const handleStartSimulation = async () => {
    if (!selected) return;

    const personality = personalityMap[selected];

    await createAndStartSimulation(personality);

    router.push("/screens/citizen/simulation/audience");
  };

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
            Escolha a personalidade da IA para simular uma audiência jurídica e
            pratique seus argumentos.
          </Text>
        </View>
        {simulationPersonalities.map((personality, index) => (
          <CategoryCard
            {...personality}
            key={index}
            onPress={() => setSelected(personality.title)}
            isSelected={selected === personality.title}
          />
        ))}

        <ButtonUI
          children={
            <View className="justify-center items-center flex-1">
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-interSemiBold text-[16px]">
                  Iniciar simulação
                </Text>
              )}
            </View>
          }
          onPress={handleStartSimulation}
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
