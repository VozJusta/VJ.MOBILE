import { IButtonOption } from "@/interfaces/components/ButtonOptions";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Keyboard } from "react-native";
import ButtonAudio from "../ButtonAudio";
import { useState } from "react";

export function ButtonOption({
  handleSendFile,
  onStartRecording,
  onStopRecording,
  loading,
  positionsInput,
  modalVisible
}: IButtonOption) {
  const [selectedInsert, setSelectedInsert] = useState<
    "audio" | "evidence" | null
  >(null);
  const [isOpenInsertOptions, setIsOpenInsertOptions] = useState(false);
  const positionButtonContainer =
    positionsInput === "textArea" ? "" : "relative";

  const positionOptions =
    positionsInput === "input" ? "bottom-16 left-2" : "bottom-[63px] right-0";
  return (
    <View className="">
      <View className={positionButtonContainer}>
        {isOpenInsertOptions && (
          <View
            className={`absolute w-[170px] ${positionOptions} bg-[#1E293B] rounded-lg p-2 flex flex-col gap-6`}
          >
            <ButtonUI
              onPress={() => {
                Keyboard.dismiss()
                setSelectedInsert("evidence");
                setIsOpenInsertOptions(false);
                modalVisible?.()
              }}
            >
              <View className="flex-row w-full items-center gap-1">
                <MaterialCommunityIcons
                  name="paperclip"
                  size={22}
                  color="#94A3B8"
                />
                <Text className="text-[15px] text-[#94A3B8]">
                  Adicionar evidência
                </Text>
              </View>
            </ButtonUI>
            <ButtonUI
              onPress={() => {
                Keyboard.dismiss()
                setSelectedInsert("audio");
                setIsOpenInsertOptions(false);
                modalVisible?.()
              }}
            >
              <View className="flex-row w-full items-center gap-1">
                <MaterialCommunityIcons
                  name="microphone"
                  size={22}
                  color="#94A3B8"
                />
                <Text className="text-[15px] text-[#94A3B8]">
                  Adicionar áudio
                </Text>
              </View>
            </ButtonUI>
          </View>
        )}
        {selectedInsert === null ? (
          <ButtonUI
            onPress={(e) => {
              e?.stopPropagation?.();
              Keyboard.dismiss();
              setIsOpenInsertOptions(!isOpenInsertOptions);
            }}
          >
            <View className="flex w-[55px] h-[55px] bg-BlueAzure rounded-full items-center justify-center">
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
            onPress={() => {
              handleSendFile();
              setSelectedInsert(null);
            }}
          >
            <View className="flex w-[55px] h-[55px] bg-BlueAzure rounded-full items-center justify-center">
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
