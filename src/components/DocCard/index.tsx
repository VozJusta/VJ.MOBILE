import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IDocCard } from "@/interfaces/components/DocCard";

export default function DocCard({ ...props }: IDocCard) {
  return (
    <View className="flex flex-row items-center p-3 justify-between bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl w-full h-fit">
      <View className="flex flex-row gap-3 items-center">
        <View className="flex items-center justify-center p-3 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
          <MaterialIcons name="article" size={24} color={"#3B82F6"} />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="font-inter text-[14px] text-white">
            {props.nameFile}
          </Text>
          <Text className="font-interRegular text-[12px] text-[#6B7280]">
            {props.size} • {props.date}
          </Text>
        </View>
      </View>
      <MaterialIcons name="download" size={24} color={"#94A3B8"} />
    </View>
  );
}
