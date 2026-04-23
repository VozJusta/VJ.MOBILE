import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import DocCard from "@/components/DocCard";

export default function DocumentsCitizen() {
  const [checkedFile, setCheckedFile] = useState<
    DocumentPicker.DocumentPickerAsset[] | null
  >(null);
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    setCheckedFile(result.assets);

    if (result.canceled === false) {
      return null;
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 128 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className="gap-[32px]">
          <Header isFirstPage={true} title="DOCUMENTOS" isCitizen={true} />
          <View className="w-full justify-center items-center py-[32px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(19,91,236,0.3)] rounded-[48px]">
            {checkedFile === null ? (
              <ButtonUI
                children={
                  <View
                    className={`w-[80px] h-[80px] rounded-full bg-[#135BEC] justify-center items-center `}
                  >
                    <MaterialIcons name="add" size={40} color="white" />
                  </View>
                }
                onPress={pickFile}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            ) : (
              <ButtonUI
                children={
                  <View className="items-center justify-center">
                    <View
                      style={{
                        position: "absolute",
                        width: 154,
                        height: 154,
                        borderRadius: 9999,
                        backgroundColor: "rgba(34,197,94,0.2)",
                        filter: "blur(64px)",
                      }}
                    />
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.8, y: 1 }}
                      colors={["#16A34A", "#4ADE80"]}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 999,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialIcons name="done" size={40} color="white" />
                    </LinearGradient>
                  </View>
                }
                onPress={pickFile}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            )}
            <Text className="font-inter text-[20px] text-white mt-[16px] mb-[4px]">
              {checkedFile === null ? "Novo Documento" : "Upload concluído"}
            </Text>
            <Text
              className={`font-inter text-[14px] ${checkedFile === null ? "text-[#94A3B8]" : "text-[#75FB4C]"}`}
            >
              {checkedFile === null
                ? "PDF, PNG ou JPG (máx 10MB)"
                : "Toque para visualizar o documento"}
            </Text>
          </View>
          <View className="flex-row justify-between w-full">
            <Text className="text-[#64748B] text-[14px] font-interSemiBold uppercase">
              Arquivos Recentes
            </Text>
            <Text
              className="font-interSemiBold text-[12px] text-[#135BEC]"
              onPress={() =>
                router.push("/screens/citizen/documents/allDocuments")
              }
            >
              Ver Todos
            </Text>
          </View>
          <View className="flex-col gap-[16px]">
            <DocCard
              nameFile="Contrato_aluguel"
              date="14 Out 2023"
              size="14MB"
            />
            <DocCard
              nameFile="Contrato_aluguel"
              date="14 Out 2023"
              size="14MB"
            />
          </View>
        </View>
        <View className="flex-col gap-[25px]">
          <View className="w-full bg-white/5 h-[1px] mt-[32px]"></View>
          <View className=" w-full pt-6 py-[24px]">
            <ButtonUI
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
              gradient={true}
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
              children={
                <View className="flex-1 justify-center items-center">
                  <Text className="text-[15px] font-interSemiBold text-white">
                    Salvar documento
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
