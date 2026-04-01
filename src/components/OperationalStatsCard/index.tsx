import { OperationalStatsCardProps } from "@/interfaces/components/OperationalStatsCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function OperationalStatsCard({
  ...props
}: OperationalStatsCardProps) {
  return (
    <View
      className="flex flex-col border gap-2 w-full py-8 px-4 h-[155px]"
      style={{ backgroundColor: props.bgColor, borderColor: props.borderColor }}
    >
      <MaterialIcons name={props.icon} size={20} />
      <Text className="text-[24px] font-interBold text-white">
        {props.title}
      </Text>
      <Text className="text-[14px] font-inter text-[#94A3B8]">
        {props.stat}
      </Text>
    </View>
  );
}
