import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface IEmptyState {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  description?: string;
}

export default function EmptyState(props: IEmptyState) {
  return (
    <View className="p-8 border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.7)] rounded-[16px] flex flex-col gap-4 justify-center items-center">
      <MaterialIcons name={props.icon} size={48} color="#8D90A1" />
      <Text className="font-interSemiBold text-[16px] text-center text-white">
        {props.title}
      </Text>
      {props.description && (
        <Text className="font-interRegular text-[14px] text-center text-white">
          {props.description}
        </Text>
      )}
    </View>
  );
}
