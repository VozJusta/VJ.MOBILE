import { IStatsCard } from "@/interfaces/components/StatCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";


export default function StatsCard(props: IStatsCard) {
  return (
    <View className="flex flex-row items-center gap-5 rounded-2xl p-6 bg-[#161E29]/70 border border-[#2B86EE]/20">
      <View
        style={{ backgroundColor: props.bgColor }}
        className="p-4 flex items-center w-fit h-fit rounded-xl"
      >
        <MaterialIcons
          name={props.icon}
          color={props.iconColor}
          size={24}
        ></MaterialIcons>
      </View>
      <View className="flex flex-col h-fit ">
        <Text className="text-[14px] font-inter text-[#94A3B8]">
          {props.title}
        </Text>
        <Text className="text-[30px] font-interBold text-[#FFFFFF]">
          {props.stat}
        </Text>
      </View>
    </View>
  );
}
