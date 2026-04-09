import { BadgeProps } from "@/interfaces/components/Badge";
import { Text, View } from "react-native";

export default function Badge({ ...props }: BadgeProps) {
  return (
    <View
      className="flex text-center items-center py-0.5 px-2 rounded"
      style={{ backgroundColor: props.badgeColor + "33" }}
    >
      <Text
        className="font-interBold text-[10px]"
        style={{ color: props.badgeColor }}
      >
        {props.textBadge}
      </Text>
    </View>
  );
}
