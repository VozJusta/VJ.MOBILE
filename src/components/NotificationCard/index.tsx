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
    <View className="p-4 flex flex-row items-center w-full bg-[#09121D] justify-between rounded-lg border-1 border-[#1C242E]">
      <TypeNotificationCard {...props} />

      <View className="flex flex-col items-center justify-between w-full h-fit gap-1 ">
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="font-interBold text-[14px] text-white truncate">
            {props.title}
          </Text>
          <Text className="font-interRegular text-[12px] text-[#94A3B8]">
            {props.description}
          </Text>
        </View>
        <Text className="font-interRegular text-[12px] text-[#94A3B8]">
          {props.date.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
