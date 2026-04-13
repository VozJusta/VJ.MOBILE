import Header from "@/components/Header";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatCitizenScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="CHAT" isFirstPage={true} isCitizen={true} />

      <View className="mt-[40px] rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-[20px]">
        <Text className="text-[20px] text-white font-interSemiBold">
          Chat em breve
        </Text>
        <Text className="mt-[8px] text-[14px] text-[#94A3B8] font-interRegular">
          Esta area sera liberada em uma proxima atualizacao.
        </Text>
      </View>
    </SafeAreaView>
  );
}
