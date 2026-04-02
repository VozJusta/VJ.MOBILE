import { IFilterStatus } from "@/interfaces/components/FilterStatus";
import { View, Text, TouchableOpacity } from "react-native";

export default function FilterStatus({ ...props }: IFilterStatus) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center gap-2 py-3 px-5 bg-[#3394F1] rounded-full"
      onPress={props.onPress}
    >
      <Text className="font-interSemiBold text-[16px]">{props.status}</Text>
      <View className="w-fit h-fit flex items-center justify-center px-2 py-1 rounded-full bg-[#002B50]/20">
        <Text className="font-interSemiBold text-[12px]">{props.amount}</Text>
      </View>
    </TouchableOpacity>
  );
}
