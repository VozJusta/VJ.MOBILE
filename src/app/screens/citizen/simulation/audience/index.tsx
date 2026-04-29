import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ButtonAudio from "@/components/ButtonAudio";
import { MaterialIcons } from "@expo/vector-icons";

export default function SimulationAudience() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-8">
        <Header
          isFirstPage={false}
          title="SIMULAÇÃO DE AUDIÊNCIA"
          isCitizen={true}
        />

        <View className="bg-black w-full h-[100px] rounded-xl" />

        <View className="flex flex-row w-full h-fit gap-6">
          <ButtonAudio />

          <TouchableOpacity className="flex h-12 w-12 items-center justify-center rounded-full shadow-sm bg-white">
            <MaterialIcons name="stop" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
