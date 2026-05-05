import { Text, View } from "react-native";
import TypeNotificationCard from "../TypeNotificationCard";
import { TNotificationCard } from "@/interfaces/components/NotificationCard";
export default function NotificationCard({ ...props }: TNotificationCard) {
  return (
    <View className="p-4 flex flex-row items-center w-full h-fit bg-[rgb(255,255,255,0.03)] gap-4 rounded-2xl border border-[rgb(255,255,255,0.03)]">
      <TypeNotificationCard {...props} />
      <View className="flex-1 flex-col gap-1">
        <View className="flex flex-row items-center justify-between w-fit h-fit gap-2">
          <Text className="font-interBold text-[14px] text-white truncate w-fit">
            {props.title}
          </Text>
          <Text className="font-interRegular text-[12px] text-[#94A3B8] w-fit">
            {props.date.toLocaleDateString()}
          </Text>
        </View>
        <Text
          className="font-interRegular text-[12px] text-[#94A3B8] w-fit h-fit"
          numberOfLines={2}
        >
          {props.description}
        </Text>
      </View>
    </View>
  );
}
