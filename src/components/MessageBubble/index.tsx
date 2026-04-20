import { View, Text } from "react-native";
import React from "react";

export interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  userName?: string;
  createdAt?: string;
}

export default function MessageBubble(props: MessageBubbleProps) {

  const formatTime = (dateStr: string) => {
    try {
      const isNumeric = /^\d+$/.test(dateStr);
      const dateObj = isNumeric ? new Date(Number(dateStr)) : new Date(dateStr);
      
      return dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };
  return (
    <View
      className="flex flex-col gap-2 w-full h-fit"
      style={{ alignItems: props.isUser ? "flex-end" : "flex-start" }}
    >
      <Text className="font-interSemiBold text-[14px] text-[#94A3B8]">
        {props.userName ? props.userName : "VozJusta AI"}
      </Text>

      <View
        className="w-[90%] p-5"
        style={{
          backgroundColor: props.isUser
            ? "#135BEC"
            : "rgba(255, 255, 255, 0.1)",
          borderTopLeftRadius: props.isUser ? 16 : 0,
          borderTopRightRadius: props.isUser ? 0 : 16,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Text className="font-inter text-[14px] text-white">
          {props.message}
        </Text>
      </View>
      <Text className="font-interSemiBold text-[14px] text-[#94A3B8]">
        {props.createdAt
          ? formatTime(props.createdAt)
          : ""}
      </Text>
    </View>
  );
}
