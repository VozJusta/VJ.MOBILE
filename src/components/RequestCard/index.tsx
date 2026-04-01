import { Alert, Text, TouchableOpacity, View } from "react-native";
import Badge from "../Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { RequestCardProps } from "@/interfaces/components/RequestCard";

export default function RequestCard(props: RequestCardProps) {
  return (
    <View className="flex flex-col w-full gap-6 p-5 bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl">
      <View className="flex flex-col items-start gap-3">
        <Text className="font-interBold text-[16px] text-white">
          {props.title}
        </Text>
        <Badge {...props} />
      </View>
      <View className="flex flex-row items-center justify-between ">
        <View className="flex flex-col pr-6 border-r border-[#2B86EE]/10">
          <Text className="font-inter text-[14px] text-[#94A3B8]">SCORE</Text>
          <Text className="font-interBold text-[20px] text-[#34D399]">
            {props.score}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-4">
          <View className="flex flex-col gap-1">
            <Text className="font-inter text-[14px] text-[#94A3B8]">
              Relatório do caso
            </Text>
            <Text className="font-interBold text-[12px] text-[#34D399]">
              Feito por IA
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Atenção!",
                "Esta funcionalidade está em desenvolvimento ainda.",
              )
            }
            className="flex rounded-full py-3 px-3 items-center justify-center bg-[#161E29] border-[#2B86EE]/20 border"
          >
            <MaterialIcons name="visibility" size={20} color={"#2B86EE"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
