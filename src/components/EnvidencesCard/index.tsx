import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import DocCard from "../DocCard";

export interface EvidencesCardProps {}

export default function EvidencesCard() {
  return (
    <View className="flex flex-col p-6 gap-4 bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl w-full h-fit">
      <View className="flex flex-row border-b border-b-[#2b86ee]/20 pb-3 gap-2">
        <MaterialIcons
          name="attachment"
          size={24}
          color="#2b86ee"
          className="rotate-90"
        />
        <Text className="font-interBold text-[16px] text-white">
          EVIDÊNCIAS
        </Text>
      </View>

      <DocCard nameFile="extrato_aluguel.jpg" date="01/01/2023" size="1.2 MB" />
      <DocCard nameFile="extrato_aluguel.jpg" date="01/01/2023" size="1.2 MB" />
      <DocCard nameFile="extrato_aluguel.jpg" date="01/01/2023" size="1.2 MB" />
    </View>
  );
}
