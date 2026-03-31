import { Text, View } from "react-native";
import TypeNotificationCard, {
  TypeNotificationCardProps,
} from "../TypeNotificationCard";

export type NotificationCardProps = TypeNotificationCardProps & {
  id: string;
  title: string;
  description: string;
  date: Date;
};

export default function NotificationCard({ ...props }: NotificationCardProps) {
  return (
    <View className="p-4 flex flex-row items-center w-full h-fit bg-[#09121E] gap-4 rounded-lg border-1 border-[#1C2027]">
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
        <Text className="font-interRegular text-[12px] text-[#94A3B8] w-fit h-fit" numberOfLines={2}>
            {props.description}
        </Text>
      </View>
    </View>
  );
}
