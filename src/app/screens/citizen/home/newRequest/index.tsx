import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import TextArea from "@/ui/TextareaUI";
import { newRequestData } from "@/utils/home/newRequest/data";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewRequest() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, gap: 32 }}>
        <Header title="NOVO CASO" isFirstPage={false} isCitizen={true} />
        <View className="flex-col mt-[24px] gap-[16px] w-full">
          <Text className="text-[14px] text-[#94A3B8] font-inter uppercase">
            Selecione uma categoria
          </Text>

          {newRequestData.map((request, index) => (
            <CategoryCard {...request} key={index} />
          ))}
        </View>
        {/* <View className="mt-[32px] gap-[16px]">
          <ButtonAudio />
        </View> */}
        <TextArea
          placeholder="Descreva o que aconteceu com suas 
próprias palavras..."
        />
      </SafeAreaView>
    </ScrollView>
  );
}
