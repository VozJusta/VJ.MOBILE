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
import { useRouter } from "expo-router";
import { useChat } from "@/hooks/chat/useChat";
import ButtonAudio from "@/components/ButtonAudio";

export default function Chat() {
  const router = useRouter();

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
          <View className="relative w-full">
            <TextArea
              placeholder="Descreva o que aconteceu com suas próprias palavras..."
              value={description}
              onChangeText={setDescription}
            />

            <View className="absolute bottom-3 right-3">
              <ButtonAudio
                isRecording={isRecording}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                disabled={loading}
              />
            </View>
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
