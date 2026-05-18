import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { VideoView } from "expo-video";
import { formatSeconds } from "@/utils/screens/citizen/simulation";

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
    remainingSecs,
    isSpeaking,
    videoUrl,
    handlePauseAudio,
    isPaused,
    isAudioPlaying,
    player,
  } = useSimulationAudience();

  const showLoading = isTranscribing || isLoading;
  const shouldDisableButtonAudio =
    showLoading ||
    (!isPaused && (isSpeaking || isAudioPlaying || Boolean(videoUrl)));

  const [opacity] = useState(() => new Animated.Value(1));

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
  }, [opacity]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="gap-8" style={{ paddingBottom: 32 }}>
        <Header
          isFirstPage={false}
          title="SIMULAÇÃO DE AUDIÊNCIA"
          isCitizen={true}
        />

        {remainingSecs !== null && (
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

        {isSpeaking && !videoUrl && (
          <View className="bg-black w-full h-[250px] rounded-xl items-center justify-center">
            <ActivityIndicator color="white" />
            <Text className="text-white mt-2 font-interRegular text-sm">
              Gerando vídeo do juiz...
            </Text>
          </View>
        )}

        {videoUrl && (
          <VideoView
            player={player}
            style={{ width: "100%", height: 250, borderRadius: 12 }}
            contentFit="cover"
            nativeControls={false}
          />
        )}

        {!isSpeaking && !videoUrl && (
          <View className="bg-black w-full h-[250px] rounded-xl" />
        )}

        <View className="flex flex-col gap-4">
          {(showLoading || isSpeaking) && !videoUrl && (
            <Skeletons amountOfSkeletons={2} height={100} />
          )}

          {!showLoading && !transcribedText && !aiResponse && (
            <EmptyState
              icon="mic"
              title="Ainda não há mensagens na audiência"
              description="Quando você começar a falar, a transcrição aparecerá aqui e o juiz IA responderá com base no que foi dito."
            />
          )}

          {transcribedText && !showLoading && !isSpeaking && (
            <MessageBubble
              message={transcribedText}
              isUser={true}
              userName="Você"
            />
          )}

          {aiResponse && !showLoading && !isSpeaking && (
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
              disabled={shouldDisableButtonAudio}
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
        </View>

        <ButtonUI
          onPress={() =>
            router.push(
              "/screens/citizen/simulation/audience/audienceCompleted",
            )
          }
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
          disabled={
            (simulationStatus !== "Completed" &&
              simulationStatus !== "TimedOut") ||
            showLoading
          }
        >
          <View className="justify-center items-center flex-1">
            <Text className="text-white font-interSemiBold text-[16px]">
              Encerrar simulação
            </Text>
          </View>
        </ButtonUI>
      </SafeAreaView>
    </ScrollView>
  );
}
