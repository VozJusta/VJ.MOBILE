import ButtonUI from "@/ui/ButtonUI";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewRequest() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="px-[24px]">
      <View className=" gap-[35px] items-center flex-row mt-[32px]">
        <ButtonUI
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
          gradient={false}
          hover={false}
          iconLeft={false}
          goBack
          size="w-[40px] h-[40px]"
          paddingButtonStatus={""}
        />
        <Text className="text-[18px] text-white font-interSemiBold">
            Relatar Novo Caso
        </Text>
      </View>
    </SafeAreaView>
  );
}
