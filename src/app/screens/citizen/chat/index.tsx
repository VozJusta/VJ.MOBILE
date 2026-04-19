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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useChatStorage } from "@/store/chat/chat.store";
import Toast from "react-native-toast-message";
import { set } from "zod";
import { startConversation } from "@/services/ai/conversation/startConversation";

export default function Chat() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { clearChat, setConversationId, setCaseId, addMessage } =
    useChatStorage();

  const handleStartAnalysis = async () => {
    if (!selectedCategory) {
      Toast.show({
        type: "error",
        text1: "Selecione uma categoria para iniciar a análise",
      });
      return;
    }

    if (!description.trim()) {
      Toast.show({
        type: "error",
        text1: "Descreva o ocorrido para iniciar a análise",
      });
      return;
    }

    setLoading(true);

    try {
      clearChat();

      const firstMessageText = `Categoria: ${selectedCategory}\n\nRelato: ${description}`;

      addMessage({
        id: Date.now().toString() + "-user",
        content: firstMessageText,
        role: "User",
        created_at: String(Date.now()),
      })

      const response = await startConversation({
        message: firstMessageText,
      })

      if (!response.success || !response.data) {
        Toast.show({
          type: "error",
          text1: response.fields ? response.fields[0] : "Erro ao iniciar análise",
        });
        return;
      }

      setConversationId(response.data.conversationId);
      setCaseId(response.data.caseId);

      addMessage({
        id: Date.now().toString() + "-assistant",
        content: response.data.question,
        role: "Assistant",
        created_at: String(Date.now()),
      })

      router.push("/screens/citizen/chat/conversation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{ flex: 1, gap: 32 }}>
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
          {/* <View className="mt-[32px] gap-[16px]">
          <ButtonAudio />
        </View> */}
          <TextArea
            placeholder="Descreva o que aconteceu com suas 
próprias palavras..."
          />
        </SafeAreaView>

        <ButtonUI
          children={
            <View className="justify-center items-center flex-1">
              <Text className="text-white font-interSemiBold text-[16px]">
                Iniciar análise por IA
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
