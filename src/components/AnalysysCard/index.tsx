import { View, Text } from "react-native";
import React from "react";
import { AnalysysCardProps } from "@/interfaces/components/AnalysysCard";

export default function AnalysysCard({ ...props }: AnalysysCardProps) {
  return (
    <View className="flex flex-col w-full h-fit border-l-4 rounded-xl p-5 bg-[#161E29]/70 gap-6 border-l-[#2B86EE]">
      <View className="flex flex-col gap-4 text-start">
        <Text className="font-interSemiBold text-[16px] text-white">
          {props.title}
        </Text>
        <Text className="font-interRegular text-[14px] text-[#FFFFFF]">
          {props.text}
        </Text>
      </View>
    </View>
  );
}
