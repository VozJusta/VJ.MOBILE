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
import ButtonUI from "@/ui/ButtonUI";
import { useChat } from "@/hooks/chat/useChat";
import { useEffect, useRef } from "react";
import ButtonAudio from "@/components/ButtonAudio";
import { formatTime } from "@/utils/components/ButtonAudio";
import { AnimatedAudioBar } from "@/components/AudioBar";
import { router } from "expo-router";

import { useEvidenceUpload } from "@/hooks/chat/useEvidenceUpload";
import { ButtonOption } from "@/components/ButtonOption";
import { Evidences } from "@/components/Evidences";
import Toast from "react-native-toast-message";

export default function ConversationAI() {
  const scrollViewRef = useRef<ScrollView>(null);

  const {
    messages,
    loading,
    finished,
    message,
    handleSendMessage,
    setMessage,
    isRecordingMessage,
    handleStartRecordingMessage,
    handleStopRecordingMessage,
    meteringVoiceMessage,
    recordingDurationMessage,
  } = useChat();
  const {
    handleSendFile,
    fileUri,
    clearFiles,
    ocrContent,
    fileTypes,
    removeEvidence,
  } = useEvidenceUpload();

  const displayMessage = message;

  const firstMessageText =
    ocrContent.length > 0
      ? `${message}\n\n[EVIDÊNCIAS ANEXADAS]\n${ocrContent.join("\n---\n")}`
      : message;

  const handleSend = async () => {
    await handleSendMessage(
      fileUri,
      firstMessageText,
      displayMessage,
      fileTypes,
    );
    clearFiles();
  };

  useEffect(() => {
    if (message.length >= 600) {
      Toast.show({
        type: "error",
        text1: "Mensagem muito longa",
      });
    }
  }, [message]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1, gap: 32, paddingBottom: 2 }}>
        <Header title="CHAT" isFirstPage={false} isCitizen={true} />

        <ScrollView
          style={{ flex: 1 }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg.content}
              createdAt={msg.created_at}
              userName={msg.role === "User" ? "Você" : "Assistente"}
              isUser={msg.role === "User"}
              uri={msg.role === "User" ? msg.uri : undefined}
              fileTypes={msg.role === "User" ? msg.fileTypes : undefined}
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
          <View
            style={{ marginTop: 16, paddingBottom: 20 }}
            className="w-full flex-col"
          >
            {fileUri.length > 0 && (
              <View className="flex w-full items-end flex-row gap-[10px] ">
                {fileUri.map((uri, index) => {
                  return (
                    <Evidences
                      key={index}
                      uri={uri}
                      index={index}
                      fileTypes={fileTypes}
                      removeEvidence={removeEvidence}
                      size="w-[100px] h-28"
                    />
                  );
                })}
              </View>
            )}
            {!isRecordingMessage ? (
              <View>
                <View className="flex-row items-center w-full gap-2">
                  <ButtonOption
                    handleSendFile={handleSendFile}
                    onStartRecording={handleStartRecordingMessage}
                    onStopRecording={handleStopRecordingMessage}
                    loading={loading}
                    positionsInput={"input"}
                  />

                  <View className="flex-1">
                    <InputUI
                      maxLength={600}
                      placeholder="Digite sua mensagem..."
                      rightIcon
                      rightIconName="send"
                      iconSize={24}
                      iconColor={message.trim() ? "#135BEC" : "gray"}
                      iconNameProps="send"
                      type="text"
                      value={message}
                      onChangeText={setMessage}
                      onRightIconPress={handleSend}
                      onSubmitEditing={handleSend}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View className="relative w-full min-h-[200px] flex items-center justify-center bg-[rgba(255,255,255,0.03)] rounded-xl border border-solid border-white/10">
                <View className="flex-row items-end justify-center gap-1 h-12 mb-2">
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={12}
                    modifier={0.4}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={45}
                    modifier={1.3}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceMessage}
                    baseHeight={12}
                    modifier={0.4}
                  />
                </View>

                <Text className="text-lg font-interSemiBold text-[#2563EB]">
                  Gravando o áudio
                </Text>
                <Text className="text-sm font-interRegular text-[#64748B]">
                  {formatTime(recordingDurationMessage)}
                </Text>

                <View className="absolute bottom-3 left-3 z-10">
                  <ButtonAudio
                    isRecording={true}
                    onStartRecording={handleStartRecordingMessage}
                    onStopRecording={handleStopRecordingMessage}
                    disabled={loading}
                  />
                </View>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{ marginTop: 16, marginBottom: 20 }}
            className="w-full flex-col gap-4"
          >
            <ButtonUI
              onPress={() =>
                router.push("/screens/citizen/chat/analysysConcluded")
              }
              gradient={true}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            >
              <View className="justify-center  items-center flex-1">
                <Text className="text-white font-interSemiBold text-[16px]">
                  Ver Relatório do Caso
                </Text>
              </View>
            </ButtonUI>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
