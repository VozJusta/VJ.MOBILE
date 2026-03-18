import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import * as DocumentPicker from 'expo-document-picker';

export default function DocumentsCitizen() {
    const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // aceita qualquer tipo de arquivo
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
            <View className="w-full py-[32px] bg-[rgba(255,255,255,0.03)] border border-solid border-[rgba(19,91,236,0.3)] rounded-[48px]">
            
            </View>
        </SafeAreaView>
    )
}