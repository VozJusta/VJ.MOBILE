import { IButtonOption } from "@/interfaces/components/ButtonOptions";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import ButtonAudio from "../ButtonAudio";
import { useState } from "react";

export function ButtonOption({
  handleSendFile,
  onStartRecording,
  onStopRecording,
  loading,
  positionsInput,
}: IButtonOption) {
  const [selectedInsert, setSelectedInsert] = useState<
    "audio" | "evidence" | null
  >(null);
  const [isOpenInsertOptions, setIsOpenInsertOptions] = useState(false);
  const positionButtonContainer =
    positionsInput === "textArea" ? "absolute bottom-3 right-3" : "relative";

    const positionOptions = positionsInput === "input" ? "bottom-16 -right-10" : "bottom-16 right-0";
    
  return (
    <View className="">
      <View className={positionButtonContainer} z-10>
        {isOpenInsertOptions && (
          <View className={`absolute w-[170px] ${positionOptions} bg-[#1E293B] rounded-lg p-2 flex flex-col gap-4`}>
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
            onPress={() => setIsOpenInsertOptions(!isOpenInsertOptions)}
          >
            <View className="flex w-[50px] h-[50px] bg-BlueAzure rounded-full items-center justify-center">
              <MaterialCommunityIcons name="plus" size={25} color={"#FFFF"} />
            </View>
          </ButtonUI>
        ) : selectedInsert === "audio" ? (
          <ButtonAudio
            isRecording={false}
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
            disabled={loading}
            onLongPress={() => {
              setSelectedInsert(null);
              setIsOpenInsertOptions(true);
            }}
            delayLongPress={500}
          />
        ) : (
          <ButtonUI
            onLongPress={() => {
              setSelectedInsert(null);
              setIsOpenInsertOptions(true);
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
  );
}
