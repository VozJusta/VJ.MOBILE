import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ButtonAudio from "@/components/ButtonAudio";
import { MaterialIcons } from "@expo/vector-icons";
import { useSimulationAudience } from "@/hooks/simulation/useSimulationAudience";
import ButtonUI from "@/ui/ButtonUI";
import { router } from "expo-router";
import MessageBubble from "@/components/MessageBubble";

export default function SimulationAudience() {
  const {
    handleStartRecording,
    handleStopRecording,
    handleStop,
    isRecording,
    isLoading,
    simulationStatus,
    transcribedText,
    aiResponse,
  } = useSimulationAudience();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-8">
        <Header
          isFirstPage={false}
          title="SIMULAÇÃO DE AUDIÊNCIA"
          isCitizen={true}
        />

        <View className="bg-black w-full h-[200px] rounded-xl" />

        {transcribedText && (
          <MessageBubble
            message={transcribedText}
            isUser={true}
            userName="Você"
          />
        )}

        {aiResponse && (
          <MessageBubble
            message={aiResponse}
            isUser={false}
            userName="Juiz IA"
          />
        )}

        <View className="flex flex-row w-full h-fit gap-6 items-center justify-center">
          <ButtonAudio
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            disabled={isLoading}
          />

          <TouchableOpacity
            onPress={handleStop}
            className="flex h-16 w-16 items-center justify-center rounded-full shadow-sm bg-white"
          >
            <MaterialIcons name="stop" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ButtonUI
          onPress={() => router.push("/screens/citizen/simulation/report")}
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
          disabled={
            simulationStatus !== "Completed" && simulationStatus !== "TimedOut"
          }
          children={
            <View className="justify-center items-center flex-1">
              <Text className="text-white font-interSemiBold text-[16px]">
                Encerrar e Ver Feedback
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </ScrollView>
  );
}
