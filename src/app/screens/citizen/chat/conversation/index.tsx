import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import InputUI from "@/ui/InputUI";
import { useRouter } from "expo-router";
import ButtonUI from "@/ui/ButtonUI";
import { useChat } from "@/hooks/chat/useChat";
import { useRef } from "react";

export default function ConversationAI() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const {
    messages,
    loading,
    finished,
    message,
    handleSendMessage,
    setMessage,
  } = useChat();

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
