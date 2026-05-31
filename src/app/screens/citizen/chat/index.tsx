import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import ButtonUI from "@/ui/ButtonUI";
import TextArea from "@/ui/TextareaUI";
import { newRequestData } from "@/utils/home/newRequest/data";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "@/hooks/chat/useChat";
import ButtonAudio from "@/components/ButtonAudio";
import { formatTime } from "@/utils/components/ButtonAudio";
import { AnimatedAudioBar } from "@/components/AudioBar";
import { ButtonOption } from "@/components/ButtonOption";
import { useEvidenceUpload } from "@/hooks/chat/useEvidenceUpload";

import { Evidences } from "@/components/Evidences";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useEffect } from "react";

export default function Chat() {
  const {
    loading,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    handleStartAnalysis,
    handleStartRecordingDescription,
    handleStopRecordingDescription,
    isRecordingDescription,

    meteringVoiceDescription,
    recordingDurationDescription,
  } = useChat();
  const { ocrContent, fileUri, handleSendFile, removeEvidence, fileTypes } =
    useEvidenceUpload();
  const displayMessage = description;

  const firstMessageText =
    ocrContent.length > 0
      ? `${description}\n\n[EVIDÊNCIAS ANEXADAS]\n${ocrContent.join("\n---\n")}`
      : description;

  useEffect(() => {
    if (description.length > 2000) {
      Toast.show({
        type: "error",
        text1: "Descrição muito longa",
      });
    }
  }, [description]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ gap: 32, paddingBottom: 32 }}>
          <Header title="CHAT" isFirstPage={true} isCitizen={true} />
          <View className="flex-col mt-[24px] gap-[16px] w-full">
            <Text className="text-[14px] text-[#94A3B8] font-inter uppercase">
              Selecione uma categoria
            </Text>

            {newRequestData.map((request, index) => (
              <CategoryCard
                {...request}
                key={index}
                isSelected={selectedCategory === request.title}
                onPress={() => setSelectedCategory(request.title)}
              />
            ))}
          </View>

          <View className="w-full">
            {!isRecordingDescription ? (
              <View className="relative w-full">
                {fileUri.length > 0 && (
                  <View className="flex flex-row gap-[10px] ">
                    {fileUri.map((uri, index) => {
                      return (
                        <Evidences
                          key={index}
                          uri={uri}
                          index={index}
                          fileTypes={fileTypes}
                          removeEvidence={removeEvidence}
                          size="w-[100px] h-28"
                        />
                      );
                    })}
                  </View>
                )}
                <TextArea
                  maxLength={2000}
                  placeholder="Descreva o que aconteceu com suas próprias palavras..."
                  value={description}
                  onChangeText={setDescription}
                />
                <View className="absolute bottom-3 left-3 z-10">
                  <Text className="text-[12px] text-[white] font-interRegular">
                    {description.length}/2000
                  </Text>
                </View>
                <View className="absolute bottom-3 right-3 z-10">
                  <ButtonOption
                    handleSendFile={handleSendFile}
                    onStartRecording={handleStartRecordingDescription}
                    onStopRecording={handleStopRecordingDescription}
                    loading={false}
                    positionsInput={"textArea"}
                  />
                </View>
              </View>
            ) : (
              <View className="relative w-full min-h-[200px] flex items-center justify-center bg-[rgba(255,255,255,0.03)] rounded-xl border border-solid border-white/10">
                <View className="flex-row items-end justify-center gap-1 h-12 mb-2">
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={12}
                    modifier={0.4}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={45}
                    modifier={1.3}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={12}
                    modifier={0.4}
                  />
                </View>

                <Text className="text-lg font-interSemiBold text-[#2563EB]">
                  Gravando o áudio
                </Text>
                <Text className="text-sm font-interRegular text-[#64748B]">
                  {formatTime(recordingDurationDescription)}
                </Text>

                <View className="absolute bottom-3 right-3 z-10">
                  <ButtonAudio
                    isRecording={true}
                    onStartRecording={handleStartRecordingDescription}
                    onStopRecording={handleStopRecordingDescription}
                    disabled={loading}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>

        <ButtonUI
          onPress={() =>
            handleStartAnalysis(
              firstMessageText,
              fileUri,
              displayMessage,
              fileTypes,
            )
          }
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        >
          <View className="justify-center items-center flex-1">
            <Text className="text-white font-interSemiBold text-[16px]">
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Iniciar análise por IA"
              )}
            </Text>
          </View>
        </ButtonUI>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
