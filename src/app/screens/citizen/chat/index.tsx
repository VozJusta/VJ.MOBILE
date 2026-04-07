import Logo from "@/assets/svg/icons/logo.svg";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatCitizenScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="px-[16px] pt-[32px]">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-[#F1F5F9] uppercase text-[14px] font-inter">Chat</Text>
          <Logo width={40} height={29} />
        </View>

        <View className="mt-[40px] rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-[20px]">
          <Text className="text-[20px] text-white font-interSemiBold">Chat em breve</Text>
          <Text className="mt-[8px] text-[14px] text-[#94A3B8] font-interRegular">
            Esta area sera liberada em uma proxima atualizacao.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
