import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

import { useChatStorage } from "@/store/chat/chat.store";
import { historyConversation } from "@/services/ai/conversation/historyConversation";
import { continueConversation } from "@/services/ai/conversation/continueConversation";
import { startConversation } from "@/services/ai/conversation/startConversation";

export function useChat() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const {
    messages,
    addMessage,
    removeMessage,
    setMessages,
    conversationId,
    setConversationId,
    setCaseId,
    finished,
    setFinished,
    clearChat,
  } = useChatStorage();

  useEffect(() => {
    if (conversationId && messages.length === 0) {
      loadHistory();
    }
  }, [conversationId]);

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

  const handleStartAnalysis = async () => {
    if (!selectedCategory) {
      Toast.show({ type: "error", text1: "Selecione uma categoria para iniciar a análise" });
      return;
    }
    if (!description.trim()) {
      Toast.show({ type: "error", text1: "Descreva o ocorrido para iniciar a análise" });
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
      });

      const response = await startConversation({ message: firstMessageText });

      if (!response.success || !response.data) {
        Toast.show({
          type: "error",
          text1: response.fields ? response.fields[0] : "Erro ao iniciar análise",
        });
        return;
      }

      setConversationId(response.data.conversationId);
      setCaseId(response.data.caseId);

      if (response.data.finished) setFinished(response.data.finished);

      if (response.data.question) {
        addMessage({
          id: Date.now().toString() + "-assistant",
          content: response.data.question,
          role: "Assistant",
          created_at: String(Date.now()),
        });
      }

      router.push("/screens/citizen/chat/conversation");

    } catch (err) {
      Toast.show({ type: "error", text1: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || loading || finished) return;

    const userMessage = message;
    const tempId = Date.now().toString() + "-user";

    setMessage("");
    setLoading(true);

    addMessage({
      id: tempId,
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
        removeMessage(tempId);
        setMessage(userMessage);
        Toast.show({
          type: "error",
          text1: response.fields ? response.fields[0] : "Erro ao enviar mensagem",
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
    } catch (err) {
      removeMessage(tempId);
      setMessage(userMessage); 
      Toast.show({ type: "error", text1: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    description,
    setDescription,
    handleStartAnalysis,
    message,
    setMessage,
    messages,
    loading,
    fetchingHistory,
    finished,
    handleSendMessage,
  };
}