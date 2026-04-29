import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

export default function SimulationAudience() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-8">
        <Header
          isFirstPage={false}
          title="SIMULAÇÃO DE AUDIÊNCIA"
          isCitizen={true}
        />

        
      </SafeAreaView>
    </ScrollView>
  );
}
