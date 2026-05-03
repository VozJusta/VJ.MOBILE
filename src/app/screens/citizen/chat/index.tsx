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

export default function Chat() {
  const {
    loading,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    handleStartAnalysis,
    handleStartRecording,
    handleStopRecording,
    isRecording,
    meteringVoice,
    recordingDuration,
  } = useChat();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ gap: 32 }}>
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
            {!isRecording ? (
              <View className="relative w-full">
                <TextArea
                  placeholder="Descreva o que aconteceu com suas próprias palavras..."
                  value={description}
                  onChangeText={setDescription}
                />
                <View className="absolute bottom-3 right-3 z-10">
                  <ButtonAudio
                    isRecording={false}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    disabled={loading}
                  />
                </View>
              </View>
            ) : (
              <View className="relative w-full min-h-[200px] flex items-center justify-center bg-[rgba(255,255,255,0.03)] rounded-xl border border-solid border-white/10">
                <View className="flex-row items-end justify-center gap-1 h-12 mb-2">
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={12}
                    modifier={0.4}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={45}
                    modifier={1.3}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoice}
                    baseHeight={12}
                    modifier={0.4}
                  />
                </View>

                <Text className="text-lg font-interSemiBold text-[#2563EB]">
                  Gravando o áudio
                </Text>
                <Text className="text-sm font-interRegular text-[#64748B]">
                  {formatTime(recordingDuration)}
                </Text>

                <View className="absolute bottom-3 right-3 z-10">
                  <ButtonAudio
                    isRecording={true}
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    disabled={loading}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>

        <ButtonUI
          children={
            <View className="justify-center items-center flex-1">
              <Text className="text-white font-interSemiBold text-[16px]">
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Iniciar análise por IA"
                )}
              </Text>
            </View>
          }
          onPress={handleStartAnalysis}
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
