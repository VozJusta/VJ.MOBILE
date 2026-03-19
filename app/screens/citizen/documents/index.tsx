import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import * as DocumentPicker from "expo-document-picker";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import Document from "@/assets/svg/icons/document.svg";

export default function DocumentsCitizen() {
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    console.log(result);

    if (result.canceled === false) {
      console.log("Arquivo selecionado:", result.assets[0]);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="pt-[32px] px-[16px] gap-[32px]">
        <View className="w-full  flex-row justify-between ">
          <Text className="text-white text-[18px] font-interSemiBold">
            Documentos
          </Text>
          <Logo width={40} height={29} />
        </View>
        <View className="w-full justify-center items-center py-[32px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(19,91,236,0.3)] rounded-[48px]">
          <ButtonUI
            children={
              <View className="w-[80px] h-[80px] rounded-full bg-[#135BEC] justify-center items-center ">
                <MaterialIcons name="add" size={40} color="white" />
              </View>
            }
            onPress={pickFile}
            gradient={false}
            hover={false}
            iconLeft={false}
            paddingButtonStatus={""}
          />
          <Text className="font-inter text-[20px] text-white mt-[16px] mb-[4px]">
            Novo Documento
          </Text>
          <Text className="font-inter text-[14px] text-[#94A3B8]">
            PDF, PNG ou JPG (máx 10MB)
          </Text>
        </View>
        <View className="flex-row justify-between w-full">
          <Text className="text-[#64748B] text-[14px] font-interSemiBold uppercase">
            Arquivos Recentes
          </Text>
          <Text className="font-interSemiBold text-[12px] text-[#135BEC]">
            Ver Todos
          </Text>
        </View>
        <View className="flex-col gap-[16px]">
          <View className="w-full p-[16px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[48px]  justify-between items-center flex-row">
            <View className="w-[48px] h-[48px] bg-[rgba(19,91,236,0.2)] justify-center items-center rounded-full">
              <Document width={24} height={24} />
            </View>
            <View className="flex-col gap-[0.5] items-center w-[164px]">
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                className="text-[15px]  font-inter text-white"
              >
                Contrato_Aluguel_Resi
              </Text>
              <Text className="text-[12px] font-inter text-[#94A3B8]">
                1.2 MB • 14 Out 2023
              </Text>
            </View>
            <View className="bg-[rgba(19,91,236,0.1)] rounded-full border border-solid border-[rgba(19,91,236,0.2)] justify-center items-center px-[8px] py-[4px]">
              <Text className="uppercase text-[10px] text-[#135BEC] font-inter">
                Validado
              </Text>
            </View>
          </View>
          <View className="w-full p-[16px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[48px]  justify-between items-center flex-row">
            <View className="w-[48px] h-[48px] bg-[rgba(19,91,236,0.2)] justify-center items-center rounded-full">
              <Document width={24} height={24} />
            </View>
            <View className="flex-col gap-[0.5] items-center w-[164px]">
              <Text
                numberOfLines={1}
                ellipsizeMode="clip"
                className="text-[15px]  font-inter text-white"
              >
                Contrato_Aluguel_Resi
              </Text>
              <Text className="text-[12px] font-inter text-[#94A3B8]">
                1.2 MB • 14 Out 2023
              </Text>
            </View>
            <View className="bg-[rgba(236,236,19,0.1)] rounded-full border border-solid border-[rgba(253,216,53,0.2)] justify-center items-center px-[8px] py-[4px] flex-row gap-[4px]">
              <View className="w-[8px] h-[8px] rounded-full bg-WarmYellow"></View>
              <Text className="uppercase text-[10px] text-WarmYellow font-inter">
                ANALISANDO
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-col gap-[25px]">
        <View className="w-full bg-white/5 h-[1px] mt-[32px]"></View>
        <View className=" w-full px-[24px] pt-[25px] py-[24px]">
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
                <Text className="text-[15px] font-interSemiBold text-white">Salvar documento</Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
