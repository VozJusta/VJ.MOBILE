import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import * as DocumentPicker from 'expo-document-picker';
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";

export default function DocumentsCitizen() {
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    console.log(result);

    if (result.canceled === false) {
      console.log('Arquivo selecionado:', result.assets[0]);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}
      className="pt-[32px] px-[16px] gap-[32px]"
    >
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
      <View className="w-full p-[16px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[48px]  justify-between items-center flex-row">
        <View className="w-[48px] h-[48px] bg-[rgba(19,91,236,0.2)] rounded-full">
          <MaterialIcons name="Docu"/>
        </View>

      </View>
    </SafeAreaView>
  )
}