import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import InputUI from "@/ui/InputUI";
import { useRouter } from "expo-router";
import { useChatStorage } from "@/store/chat/chat.store";
import { historyConversation } from "@/services/ai/conversation/historyConversation";
import { continueConversation } from "@/services/ai/conversation/continueConversation";
import Toast from "react-native-toast-message";
import ButtonUI from "@/ui/ButtonUI";

export default function ConversationAI() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const {
    messages,
    addMessage,
    setMessages,
    conversationId,
    finished,
    setFinished,
  } = useChatStorage();

  useEffect(() => {
    if (conversationId && message.length === 0) {
      loadHistory();
    }
  }, [conversationId, message.length]);

  const loadHistory = async () => {
    setFetchingHistory(true);

    try {
      const response = await historyConversation(conversationId);

      if (response.success && response.data) {
        setMessages(response.data.messages);
      }
    } finally {
      setFetchingHistory(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || loading || finished) return;

    const userMessage = message;

    setMessage("");
    setLoading(true);

    addMessage({
      id: Date.now().toString() + "-user",
      content: userMessage,
      role: "User",
      created_at: String(Date.now()),
    });

    try {
      const response = await continueConversation({
        conversationId: conversationId,
        message: userMessage,
      });

      if (!response.success && !response.data) {
        Toast.show({
          type: "error",
          text1: response.fields
            ? response.fields[0]
            : "Erro ao enviar mensagem",
        });
        return;
      }

      if (response.data?.question) {
        addMessage({
          id: Date.now().toString() + "-assistant",
          content: response.data.question,
          role: "Assistant",
          created_at: String(Date.now()),
        });
      }

      if (response.data?.finished) {
        setFinished(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ flex: 1, gap: 32 }}>
          <Header title="CHAT" isFirstPage={false} isCitizen={true} />

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg.content}
                createdAt={msg.created_at}
                userName={msg.role === "User" ? "Você" : "Assistente"}
                isUser={msg.role === "User"}
              />
            ))}

            {loading && (
              <View className="ml-4 mt-2 mb-2">
                <Text className="text-[#94A3B8] font-inter text-[12px]">
                  A inteligência artificial está analisando...
                </Text>
              </View>
            )}
          </ScrollView>

          {!finished ? (
            <View style={{ marginTop: 16 }}>
              <InputUI
                placeholder="Digite sua mensagem..."
                rightIcon
                rightIconName="send"
                iconSize={24}
                iconColor={message.trim() ? "#135BEC" : "gray"}
                iconNameProps="send"
                type="text"
                value={message}
                onChangeText={setMessage}
                onRightIconPress={handleSendMessage}
                onSubmitEditing={handleSendMessage}
              />
            </View>
          ) : (
            <View style={{ marginTop: 16 }}>
              <ButtonUI
                onPress={() =>
                  router.push("/screens/citizen/chat/analysysConcluded")
                }
                gradient={true}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
                children={
                  <View className="justify-center items-center flex-1">
                    <Text className="text-white font-interSemiBold text-[16px]">
                      Ver Relatório do Caso
                    </Text>
                  </View>
                }
              />
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
