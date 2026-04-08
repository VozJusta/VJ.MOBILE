import { View, Text } from "react-native";
import React from "react";

export interface TermsContentProps {
  title: string;
  content: string;
}

export default function TermsContent(props: TermsContentProps) {
  return (
    <View className="flex flex-col gap-2 text-start">
      <Text className="text-white text-[14px] font-interBold">
        • {props.title}
      </Text>
      <Text className="text-[#94A3B8] text-[14px] font-interRegular">
        {props.content}
      </Text>
    </View>
  );
}
