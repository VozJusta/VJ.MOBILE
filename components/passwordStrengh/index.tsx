import { View, Animated, Text } from "react-native";
import { PasswordStrengthSection } from "../../interfaces/components/PasswordStrengh";
import CheckListFunction from "../../ui/CheckListFunctionUI";
import React, { useEffect, useRef } from "react";

export default function PasswordStrength({
  ...props
}: PasswordStrengthSection) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const percentage = props ? (props.score / 5) * 100 : 0;

    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [animatedWidth, props]);
  return (
    <View className="bg-[#fff]/5 w-full border border-[rgba(255,255,255,0.12)] rounded-[12px] p-4">
      <Text className="text-[10px] text-white pb-[8px] font-inter">
        Força da Segurança
      </Text>

      <View className="w-full h-3 bg-[#fff]/5 rounded-full mt-1">
        <Animated.View
          className="h-full rounded-full"
          style={{
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: props.color,
          }}
        />
      </View>

      <View className="flex-row gap-[90px] mt-[8px]">
        <View className="flex-col gap-2">
          {props.checklist.slice(0, 2).map((item) => (
            <CheckListFunction
              key={item.label}
              valid={item.valid}
              label={item.label}
            />
          ))}
        </View>
        <View className="flex-col gap-2">
          {props.checklist.slice(2, 4).map((item) => (
            <CheckListFunction
              key={item.label}
              valid={item.valid}
              label={item.label}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
