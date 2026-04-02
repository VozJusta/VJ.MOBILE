import { IFilterStatus } from "@/interfaces/components/FilterStatus";
import { View, Text, TouchableOpacity } from "react-native";

export default function FilterStatus({ ...props }: IFilterStatus) {


  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full"
      onPress={props.onPress}
      style={{
        backgroundColor: props.isSelected ? "#3394F1" : "#111C2A",
      }}
    >
      <Text className="font-interSemiBold text-[16px]" style={{ color: props.isSelected ? "#FFFFFF" : "#C0C7D4" }}>
        {props.status}
      </Text>
      <View className="w-fit h-fit flex items-center justify-center px-2 py-1 rounded-full"
        style={{
          backgroundColor: props.isSelected ? "#111C2A" : "#31353C",
        }}
      >
        <Text className="font-interSemiBold text-[12px]" style={{ color: props.isSelected ? "#FFFFFF" : "#C0C7D4" }}>
          {props.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
