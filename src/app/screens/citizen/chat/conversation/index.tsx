import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import MessageBubble from "@/components/MessageBubble";
import InputUI from "@/ui/InputUI";
import { useRouter } from "expo-router";

export default function ConversationAI() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, gap: 32 }}>
        <Header title="CHAT" isFirstPage={false} isCitizen={true} />

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 8 }}>
          <MessageBubble
            isUser={false}
            message="Olá, como posso te ajudar hoje?"
          />
          <MessageBubble
            isUser={true}
            message="Olá, eu gostaria de saber quais são os meus direitos em relação a um acidente de trânsito que sofri recentemente. Eu estava dirigindo e um carro bateu na minha traseira, causando danos ao meu veículo e me deixando com algumas dores no pescoço. O que eu devo fazer agora?\"
            userName="Pedro Sales"
          />
        </ScrollView>

        <InputUI
          placeholder="Digite sua mensagem..."
          rightIcon
          rightIconName="send"
          iconSize={24}
          iconColor="white"
          iconNameProps="send"
          type="text"
          onRightIconPress={() =>
            router.push("/screens/citizen/chat/analysysConcluded")
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
