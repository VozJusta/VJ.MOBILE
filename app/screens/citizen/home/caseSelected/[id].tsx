import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import ButtonUI from "@/ui/ButtonUI";
import { ICaseSelectProps } from "@/interfaces/interfaces";
import { useLocalSearchParams } from "expo-router";
import { IButtonCases } from "@/interfaces/utils/cases/interface";
import { casesData } from "@/utils/home/cases/data";

export default function CaseSelected() {
    const local = useLocalSearchParams()
    console.log(local.id)
    const caseSelected: IButtonCases[] = local.id ? casesData.filter((item) => item.id === Number(local.id)) : []
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 24, gap: 24 }}>
            <View className="flex-row items-center gap-[16px]">
                <ButtonUI onPress={function (): void {
                    throw new Error("Function not implemented.");
                }} gradient={false} hover={false} size="h-[40px] w-[40px]" goBack={true} iconLeft={false} paddingButtonStatus={""} />
                <Text className="text-[18px] text-white font-interBold">
                    {caseSelected[0].title}
                </Text>
            </View>
            <View className="py-[24px] pl-[24px] pr-[37px] bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">
                <Text className="text-[14px] font-interSemiBold text-[#2563EB]">Status Atual</Text>
                <View className="flex-row gap-[8px] items-center ">
                    <Text className="text-[24px] font-interBold text-white">
                        EM ANÁLISE PELA IA
                    </Text>
                    <View className="w-[12px] h-[12px] rounded-full bg-[#2563EB]"></View>
                </View>
                <Text className="text-[14px] text-[#94A3B8] w-[] font-interRegular">
                    Nossa inteligência artificial está
                    processando as provas anexadas.
                </Text>
            </View>
            <View className="flex-col gap-[16px]">
                <Text className="text-[14px] text-[#94A3B8] uppercase font-interSemiBold">
                    Evolução do Caso
                </Text>
                <View className="py-[24px] pl-[24px] pr-[37px] bg-[rgba(15,23,42,0.7)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[24px]">

                </View>
            </View>

        </SafeAreaView>
    )
}