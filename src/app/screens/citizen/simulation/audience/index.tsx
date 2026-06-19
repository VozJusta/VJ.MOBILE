import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ButtonAudio from "@/components/ButtonAudio";
import { MaterialIcons } from "@expo/vector-icons";
import { useSimulationAudience } from "@/hooks/simulation/useSimulationAudience";
import ButtonUI from "@/ui/ButtonUI";
import { router } from "expo-router";
import MessageBubble from "@/components/MessageBubble";
import EmptyState from "@/components/EmptyState";
import Skeletons from "@/components/Skeletons";
import { formatSeconds } from "@/utils/screens/citizen/simulation";
import { JudgeRobot } from "@/components/Judgerobot";

export default function SimulationAudience() {
  const {
    handleStartRecording,
    handleStopRecording,
    isRecording,
    isLoading,
    simulationStatus,
    transcribedText,
    aiResponse,
    isTranscribing,
    isSpeaking,
    remainingSecs,
    handlePauseAudio,
    isPaused,
    error,
    warning,
    stop,
  } = useSimulationAudience();

  const showLoading = isTranscribing || isLoading;

  const [isManuallyEnded, setIsManuallyEnded] = useState(false);
  const hasNavigatedRef = useRef(false);

  const isSessionEnded =
    simulationStatus === "Completed" ||
    simulationStatus === "TimedOut" ||
    isManuallyEnded;

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    if (
      (simulationStatus === "Completed" || simulationStatus === "TimedOut") &&
      !hasNavigatedRef.current
    ) {
      hasNavigatedRef.current = true;
      router.push("/screens/citizen/simulation/audience/audienceCompleted");
    }
  }, [simulationStatus]);

  useEffect(() => {
    if (isSessionEnded && isRecording) {
      handleStopRecording();
    }
  }, [isSessionEnded]);

  const handleEndSession = () => {
    setIsManuallyEnded(true);
    if (isRecording) handleStopRecording();
    stop();
    setTimeout(() => {
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        router.push("/screens/citizen/simulation/audience/audienceCompleted");
      }
    }, 4000);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-8">
        <Header
          isFirstPage={false}
          title="SIMULAÇÃO DE AUDIÊNCIA"
          isCitizen={true}
        />

        {error && (
          <View className="bg-red-500/20 border border-red-500 rounded-xl px-4 py-3">
            <Text className="text-red-300 text-sm text-center">{error}</Text>
          </View>
        )}
        {warning && (
          <View className="bg-yellow-500/20 border border-yellow-500 rounded-xl px-4 py-3 flex-row items-center justify-center gap-2">
            <Text className="text-yellow-300 text-sm text-center">
              {warning.message}
            </Text>
            {remainingSecs !== null && remainingSecs > 0 && (
              <Text className="text-yellow-300 text-sm font-bold">
                {remainingSecs}s
              </Text>
            )}
          </View>
        )}

        {remainingSecs !== null && !warning && (
          <View className="flex-row items-center justify-center gap-2 w-full">
            <Animated.View
              style={{ opacity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <Text className="text-[#94A3B8] font-interSemiBold text-sm">
              Tempo restante: {formatSeconds(remainingSecs)}
            </Text>
          </View>
        )}

        <JudgeRobot isSpeaking={isSpeaking} judgeName="Juiz IA - Dr. Silva" />

        <View className="flex flex-col gap-4">
          {showLoading && <Skeletons amountOfSkeletons={2} height={100} />}

          {!showLoading && !transcribedText && !aiResponse && (
            <EmptyState
              icon="mic"
              title="Ainda não há mensagens na audiência"
              description="Quando você começar a falar, a transcrição aparecerá aqui e o juiz IA responderá com base no que foi dito."
            />
          )}

          {transcribedText && !showLoading && (
            <MessageBubble
              message={transcribedText}
              isUser={true}
              userName="Você"
            />
          )}

          {aiResponse && !showLoading && (
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
              disabled={showLoading || isSessionEnded}
            />

            <TouchableOpacity
              onPress={handlePauseAudio}
              className="flex h-16 w-16 items-center justify-center rounded-full shadow-sm bg-white"
            >
              <MaterialIcons
                name={isPaused ? "play-arrow" : "pause"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {isSessionEnded && (
            <Text className="text-center text-xs text-white/50">
              Sessão encerrada
            </Text>
          )}
        </View>
        <View className="w-full flex-row items-center justify-center pb-[20px]">
          <ButtonUI
            onPress={handleEndSession}
            gradient={true}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
            disabled={showLoading && !isManuallyEnded}
          >
            <View className="justify-center items-center flex-1">
              <Text className="text-white font-interSemiBold text-[16px]">
                Encerrar simulação
              </Text>
            </View>
          </ButtonUI>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
