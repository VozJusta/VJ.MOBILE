import { View, Text } from "react-native";
import React from "react";

export interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  userName?: string;
}

export default function (props: MessageBubbleProps) {
  return (
    <View
      className="flex flex-col gap-2 items-start w-full h-fit"
      style={{ alignSelf: props.isUser ? "flex-end" : "flex-start" }}
    >
      <Text className="font-interSemiBold text-[14px] text-[#94A3B8]">
        {props.isUser ? props.userName : "VozJusta AI"}
      </Text>

      <View
        className="w-[90%] flex-1 flex text-left p-5 rounded-[16px] bg-[rgba(255,255,255,0.03)]"
        style={{
          backgroundColor: props.isUser
            ? "rgba(255, 255, 255, 0.03)"
            : "#135BEC",
          alignSelf: props.isUser ? "flex-end" : "flex-start",
          borderRadius: props.isUser
            ? "16px 0px 16px 16px"
            : "0px 16px 16px 16px",
        }}
      >
        <Text className="font-inter text-[14px] text-white">
          {props.message}
        </Text>
      </View>
    </View>
  );
}
