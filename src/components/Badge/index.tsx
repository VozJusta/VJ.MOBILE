import { BadgeProps } from "@/interfaces/components/Badge";
import { Text, View } from "react-native";

export default function Badge({ ...props }: BadgeProps) {
  return (
    <View
      className="flex flex-row text-center items-center justify-center py-2 px-4 rounded-full gap-2"
      style={{ backgroundColor: props.badgeColor + "33", borderColor: props.badgeColor + "55", borderWidth: 1 }}
    >
      <View className="w-2 h-2 rounded-full" style={{ backgroundColor: props.badgeColor }} />
      <Text
        className="font-interBold text-[10px]"
        style={{ color: props.badgeColor }}
      >
        {props.textBadge}
      </Text>
    </View>
  );
}
