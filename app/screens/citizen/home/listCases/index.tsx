import ButtonUI from "@/ui/ButtonUI";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";

export default function ListCases() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-[32px]">
            <View className="w-full  flex-row justify-between ">
                <ButtonUI goBack size="h-[40px] w-[40px]"
                    onPress={() => router.replace("/screens/citizen/home")}
                    gradient={false}
                    hover={false}
                    iconLeft={false}
                    paddingButtonStatus={""} />
                <Text className="text-[#F1F5F9] uppercase text-[14px] font-inter">
                    todos os casos
                </Text>
                <Logo width={40} height={29}/>
            </View>
        </SafeAreaView>
    );
}