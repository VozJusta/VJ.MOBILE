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
import ButtonAudio from "@/components/ButtonAudio";
import { formatTime } from "@/utils/components/ButtonAudio";
import { AnimatedAudioBar } from "@/components/AudioBar";

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
    isRecording,
    handleStartRecording,
    handleStopRecording,
    meteringVoice,
    recordingDuration,
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
            <View style={{ marginTop: 16 }} className="w-full">
              {!isRecording ? (
                <View className="flex-row items-center w-full gap-2">
                  <ButtonAudio
                    isRecording={false}
                    onStartRecording={handleStartRecording}
                    onStopRecording={() => handleStopRecording("message")} 
                    disabled={loading}
                  />

                  <View className="flex-1">
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

                  <View className="absolute bottom-3 left-3 z-10">
                    <ButtonAudio
                      isRecording={true}
                      onStartRecording={handleStartRecording}
                      onStopRecording={() => handleStopRecording("message")} 
                      disabled={loading}
                    />
                  </View>
                </View>
              )}
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
