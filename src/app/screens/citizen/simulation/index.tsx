import React, { useState } from "react";
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
                  Iniciar análise por IA
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
