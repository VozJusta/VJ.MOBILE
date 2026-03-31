import { TypeNotificationCardProps } from "@/interfaces/components/TypeNotificationCard";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TypeNotificationCard({...props}: TypeNotificationCardProps) {
  return (
    <View className={`flex items-center justify-center w-16 h-16 p-3 rounded-lg`} style={{ backgroundColor: props.bgColor }}>
      <MaterialIcons name={props.icon as any} size={24} color={props.iconColor} />
    </View>
  );
}
