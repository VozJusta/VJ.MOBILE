import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export enum TypeNotificationIcon {
  NOTIFICATION = "notification",
  ALERT = "warning",
  DOCUMENTS = "article",
  SUCCESS = "verified",
}

export enum TypeNotificationColor {
  NOTIFICATION = "#2B66E3",
  ALERT = "#FDD835",
  DOCUMENTS = "#F97316",
  SUCCESS = "#10B981",
}

export enum TypeNotificationBgColor {
  NOTIFICATION = "#0B192F",
  ALERT = "#FFEDD5",
  DOCUMENTS = "#575343",
  SUCCESS = "#161315",
}

export interface TypeNotificationCardProps {
  icon: TypeNotificationIcon;
  iconColor?: string;
  bgColor?: string;
}

export default function TypeNotificationCard({...props}: TypeNotificationCardProps) {
  return (
    <View className={`flex items-center justify-center w-fit h-fit p-3 bg-[${props.bgColor}]`} >
      <MaterialIcons name={props.icon as any} size={24} color={props.iconColor} />
    </View>
  );
}
