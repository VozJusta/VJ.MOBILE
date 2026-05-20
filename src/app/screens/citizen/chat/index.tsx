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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChat } from "@/hooks/chat/useChat";
import ButtonAudio from "@/components/ButtonAudio";
import { formatTime } from "@/utils/components/ButtonAudio";
import { AnimatedAudioBar } from "@/components/AudioBar";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useAuth } from "@/hooks/auth/useAuth";
import { createEvidences } from "@/services/citizens/createEvidences";
import Toast from "react-native-toast-message";
import { set } from "zod";


export default function Chat() {
  const {
    loading,
    description,
    setDescription,
    selectedCategory,
    setSelectedCategory,
    handleStartAnalysis,
    handleStartRecordingDescription,
    handleStopRecordingDescription,
    isRecordingDescription,
    meteringVoiceDescription,
    recordingDurationDescription,
  } = useChat();
  const [selectedInsert, setSelectedInsert] = useState<
    "audio" | "evidence" | null
  >(null);
  const [isOpenInsertOptions, setIsOpenInsertOptions] = useState(false);
  const [ocrContent, setOcrContent] = useState<string[]>([]);
  const [fileUri, setFileUri] = useState<string[] >([]);
  const handleSendFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const response = await createEvidences({ file });

    if (!response.success) {
      Toast.show({
        type: "error",
        text1: response.fields && response.fields[0],
      });
      return;
    }

    setFileUri([...fileUri, file.uri]);
    setOcrContent([...ocrContent, response.data.ocr_content || ""]);
    Toast.show({
      type: "success",
      text1: "Evidência anexada com sucesso!",
    });
  }

  const firstMessageText = ocrContent
    ? `${description}\n\nConteúdo extraído da evidência:\n${ocrContent}`
    : description;

    console.log(fileUri)
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={{ gap: 32, paddingBottom: 32 }}>
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

          <View className="w-full">
            {!isRecordingDescription ? (
              <View className="relative w-full">
                {fileUri.length > 0 && (
                  <View className="flex flex-row gap-[10px] ">
                    {fileUri.map((uri, index) => (
                      <Image
                        key={index}
                        source={{ uri }}
                        className="w-[100px] h-32 object-cover rounded-lg mb-2"
                      />
                    ))}
                  </View>
                )}
                <TextArea
                  placeholder="Descreva o que aconteceu com suas próprias palavras..."
                  value={description}
                  onChangeText={setDescription}
                />
                <View className="absolute bottom-3 right-3 z-10">
                  {isOpenInsertOptions && (
                    <View className="absolute w-[170px] bottom-16 right-0 bg-[#1E293B] rounded-lg p-2 flex flex-col gap-4">
                      <ButtonUI
                        onPress={() => {
                          setSelectedInsert("evidence");
                          setIsOpenInsertOptions(false);
                        }}
                      >
                        <View className="flex-row w-full items-center gap-2">
                          <MaterialCommunityIcons
                            name="paperclip"
                            size={20}
                            color="#94A3B8"
                          />
                          <Text className="text-[14px] text-[#94A3B8]">
                            Adicionar evidência
                          </Text>
                        </View>
                      </ButtonUI>
                      <ButtonUI
                        onPress={() => {
                          setSelectedInsert("audio");
                          setIsOpenInsertOptions(false);
                        }}
                      >
                        <View className="flex-row w-full items-center gap-2">
                          <MaterialCommunityIcons
                            name="microphone"
                            size={20}
                            color="#94A3B8"
                          />
                          <Text className="text-[14px] text-[#94A3B8]">
                            Adicionar áudio
                          </Text>
                        </View>
                      </ButtonUI>
                    </View>
                  )}
                  {selectedInsert === null ? (
                    <ButtonUI
                      onPress={() =>
                        setIsOpenInsertOptions(!isOpenInsertOptions)
                      }
                    >
                      <View className="flex w-[50px] h-[50px] bg-BlueAzure rounded-full items-center justify-center">
                        <MaterialCommunityIcons
                          name="plus"
                          size={25}
                          color={"#FFFF"}
                        />
                      </View>
                    </ButtonUI>
                  ) : selectedInsert === "audio" ? (
                    <ButtonAudio
                      isRecording={false}
                      onStartRecording={handleStartRecordingDescription}
                      onStopRecording={handleStopRecordingDescription}
                      disabled={loading}
                      onLongPress={() => {
                        setSelectedInsert(null)
                        setIsOpenInsertOptions(true)
                      }}
                      delayLongPress={500}
                    />
                  ) : (
                    <ButtonUI
                      onLongPress={() => {
                        setSelectedInsert(null)
                        setIsOpenInsertOptions(true)
                      }}
                      delayLongPress={500}
                      onPress={handleSendFile}
                    >
                      <View className="flex w-[50px] h-[50px] bg-BlueAzure rounded-full items-center justify-center">
                        <MaterialCommunityIcons
                          name="paperclip"
                          size={25}
                          color={"#FFFF"}
                        />
                      </View>
                    </ButtonUI>
                  )}
                </View>
              </View>
            ) : (
              <View className="relative w-full min-h-[200px] flex items-center justify-center bg-[rgba(255,255,255,0.03)] rounded-xl border border-solid border-white/10">
                <View className="flex-row items-end justify-center gap-1 h-12 mb-2">
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={12}
                    modifier={0.4}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={45}
                    modifier={1.3}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={30}
                    modifier={0.9}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={20}
                    modifier={0.7}
                  />
                  <AnimatedAudioBar
                    meteringVoice={meteringVoiceDescription}
                    baseHeight={12}
                    modifier={0.4}
                  />
                </View>

                <Text className="text-lg font-interSemiBold text-[#2563EB]">
                  Gravando o áudio
                </Text>
                <Text className="text-sm font-interRegular text-[#64748B]">
                  {formatTime(recordingDurationDescription)}
                </Text>

                <View className="absolute bottom-3 right-3 z-10">
                  <ButtonAudio
                    isRecording={true}
                    onStartRecording={handleStartRecordingDescription}
                    onStopRecording={handleStopRecordingDescription}
                    disabled={loading}
                  />
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>

        <ButtonUI
          onPress={() => handleStartAnalysis(firstMessageText)}
          gradient={true}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        >
          <View className="justify-center items-center flex-1">
            <Text className="text-white font-interSemiBold text-[16px]">
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Iniciar análise por IA"
              )}
            </Text>
          </View>
        </ButtonUI>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
