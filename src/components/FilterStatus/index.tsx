import { IFilterStatus } from "@/interfaces/components/FilterStatus";
import { translateStatus } from "@/utils/screens/citizen/home";
import { View, Text, TouchableOpacity } from "react-native";

export default function FilterStatus({ ...props }: IFilterStatus) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center gap-2 py-3 px-5 rounded-full"
      onPress={() => props.onPress(props.status!)}
      style={{
        backgroundColor:
          props.status === props.statusSelected ? "#3394F1" : "#111C2A",
      }}
    >
      <Text
        className="font-interSemiBold text-[16px]"
        style={{
          color: props.status === props.statusSelected ? "#FFFFFF" : "#C0C7D4",
        }}
      >
        {props.status ? translateStatus(props.status) : "Todos"}
      </Text>
      <View
        className="w-fit h-fit flex items-center justify-center px-2 py-1 rounded-full"
        style={{
          backgroundColor:
            props.status === props.statusSelected ? "#111C2A" : "#31353C",
        }}
      >
        <Text
          className="font-interSemiBold text-[12px]"
          style={{
            color:
              props.status === props.statusSelected ? "#FFFFFF" : "#C0C7D4",
          }}
        >
          {props.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
