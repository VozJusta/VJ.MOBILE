import { View, Text } from "react-native";
import React from "react";
import Badge from "../Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { LawyerCardProps } from "@/interfaces/components/LawyerCard";

export default function LawyerCard(props: LawyerCardProps) {
  return (
    <View className="flex flex-row w-full justify-between items-center bg-[#fff]/3 rounded-3xl border border-[#fff]/10 py-4 px-3">
      <View className="rounded-full bg-[#0D59F2] border border-[#0B244F] size-16 flex items-center justify-center">
        <Text className="text-white text-[12px] font-interBold">DR</Text>
      </View>
      <View className="flex flex-col gap-2 items-start">
        <Text className="font-interBold text-[16px] text-white">
          {props.name}
        </Text>
        <View className="flex flex-row gap-1.5">
          {props.badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </View>
      </View>
      <View className="flex items-center justify-center p-2.5 bg-[#0D59F2] rounded-2xl">
        <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
      </View>
    </View>
  );
}
