import { IOperationalStatsCard } from "@/interfaces/components/OperationalStatsCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function OperationalStatsCard({
  ...props
}: IOperationalStatsCard) {
  return (
    <View
      className="flex-1 flex-col border gap-2 py-8 px-4 h-[155px] rounded-2xl"
      style={{ backgroundColor: props.bgColor, borderColor: props.borderColor }}
    >
      <MaterialIcons name={props.icon} color={props.iconColor} size={20} />
      <Text className="text-[24px] font-interBold text-white">
        {props.stat}
      </Text>
      <Text className="text-[14px] font-inter text-[#94A3B8]">
        {props.title}
      </Text>
    </View>
  );
}
