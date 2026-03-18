import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";

export default function DocumentsCitizen() {
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
        </SafeAreaView>
    )
}