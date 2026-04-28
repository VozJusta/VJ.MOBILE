import React from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SimulationScreen() {
  return (
    <SafeAreaView className="gap-8">
      <Header isFirstPage={true} title="PERSONALIDADE DA IA" isCitizen={true} />


    </SafeAreaView>
  );
}
