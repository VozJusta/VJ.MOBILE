import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import InputUI from "@/ui/InputUI";
import { useRouter } from "expo-router";
import { useChatStorage } from "@/store/chat/chat.store";
import { historyConversation } from "@/services/ai/conversation/historyConversation";
import { continueConversation } from "@/services/ai/conversation/continueConversation";
import Toast from "react-native-toast-message";

export default function ConversationAI() {
  const router = useRouter();

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
      <SafeAreaView style={{ flex: 1, gap: 32 }}>
        <Header title="CHAT" isFirstPage={false} isCitizen={true} />

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.content}
              isUser={msg.role === "User"}
            />
          ))}
        </ScrollView>

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
          onSubmitEditing={handleSendMessage}
          onRightIconPress={() => handleSendMessage()}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
