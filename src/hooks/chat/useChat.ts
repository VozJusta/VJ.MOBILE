import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useChatStorage } from "@/store/chat/chat.store";
import { historyConversation } from "@/services/ai/conversation/historyConversation";
import { continueConversation } from "@/services/ai/conversation/continueConversation";
import { startConversation } from "@/services/ai/conversation/startConversation";
import {
  AudioModule,
  useAudioRecorder,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";
import { transcribeAudio } from "@/services/ai/conversation/transcribeAudio";

export function useChat() {
  const router = useRouter();
  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });

  const audioRecorderState = useAudioRecorderState(audioRecorder);

  const meteringVoice = audioRecorderState.metering || -160;

  const recordingDuration = audioRecorderState.durationMillis || 0;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);

  const [isRecording, setIsRecording] = useState(false);

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
    reportId,
    setReportId,
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
      });

      const response = await startConversation({ message: firstMessageText });

      if (!response.success || !response.data) {
        Toast.show({
          type: "error",
          text1: response.fields
            ? response.fields[0]
            : "Erro ao iniciar análise",
        });
        return;
      }

      setConversationId(response.data.conversationId);
      setCaseId(response.data.caseId);

      if (response.data.finished) {
        setFinished(response.data.finished);
        if (response.data.reportId) {
          setReportId(response.data.reportId);
        }
      }

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

        if (response.data?.reportId) {
          setReportId(response.data.reportId);
        }
      }
    } catch (err) {
      removeMessage(tempId);
      setMessage(userMessage);
      Toast.show({ type: "error", text1: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  const handleStartRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Permissão de gravação negada",
          text2:
            "Por favor, permita o acesso ao microfone para usar esta função",
        });
        return;
      }
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await audioRecorder.prepareToRecordAsync();

      audioRecorder.record();

      setIsRecording(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao iniciar gravação",
        text2: "Ocorreu um erro ao tentar iniciar a gravação de áudio",
      });
    }
  };

  const handleStopRecording = async (target: "description" | "message") => {
    try {
      setIsRecording(false);
      setLoading(true);

      await audioRecorder.stop();

      const audioUri = audioRecorder.uri;

      if (!audioUri) {
        Toast.show({
          type: "error",
          text1: "Erro ao obter gravação",
          text2: "Não foi possível obter o arquivo de áudio gravado",
        });
        return;
      }

      const response = await transcribeAudio(audioUri);

      if (response.success && response.data) {
        if (target === "description") {
          setDescription(response.data);
        } else {
          setMessage(response.data);
        }
      } else {
        Toast.show({
          type: "error",
          text1: response.fields
            ? response.fields[0]
            : "Erro ao transcrever áudio",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao transcrever áudio",
        text2: "Ocorreu um erro ao tentar transcrever o áudio",
      });
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
    handleStartRecording,
    handleStopRecording,
    isRecording,
    meteringVoice,
    recordingDuration,
  };
}
