import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import Robot from "@/assets/svg/icons/robot.svg";

const BAR_CONFIGS = [
  { baseHeight: 16, modifier: 0.5 },
  { baseHeight: 20, modifier: 0.7 },
  { baseHeight: 32, modifier: 0.9 },
  { baseHeight: 44, modifier: 1.1 },
  { baseHeight: 52, modifier: 1.3 },
  { baseHeight: 44, modifier: 1.1 },
  { baseHeight: 32, modifier: 0.9 },
  { baseHeight: 20, modifier: 0.7 },
  { baseHeight: 16, modifier: 0.5 },
];

interface JudgeRobotProps {
  isSpeaking: boolean;
  judgeName?: string;
}

function AnimatedBar({
  isSpeaking,
  baseHeight,
  modifier,
  delay,
}: {
  isSpeaking: boolean;
  baseHeight: number;
  modifier: number;
  delay: number;
}) {
  const anim = useRef(new Animated.Value(4)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isSpeaking) {
      const randomDuration = 300 + Math.random() * 300;
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: baseHeight * modifier,
            duration: randomDuration,
            delay,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 4,
            duration: randomDuration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ]),
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
      Animated.timing(anim, {
        toValue: 4,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    return () => loopRef.current?.stop();
  }, [isSpeaking]);

  return (
    <Animated.View
      style={{
        width: 6,
        height: anim,
        backgroundColor: "#2563EB",
        borderRadius: 999,
      }}
    />
  );
}

export function JudgeRobot({
  isSpeaking,
  judgeName = "Juiz IA - Dr. Silva",
}: JudgeRobotProps) {
  return (
    <View className="w-full h-[185px] flex flex-col items-center bg-[#0F1929] rounded-[16px] border border-solid border-[#1E3A5F] gap-4 pt-[29px] ">
      <Robot />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          height: 60,
        }}
      >
        {BAR_CONFIGS.map((config, i) => (
          <AnimatedBar
            key={i}
            isSpeaking={isSpeaking}
            baseHeight={config.baseHeight}
            modifier={config.modifier}
            delay={i * 40}
          />
        ))}
      </View>

      <View className="flex w-full  relative z-10 -top-6 left-3 justify-start items-start">
        <View className="flex flex-row items-center absolute gap-[9px] bg-[#2563EB]/20 px-3 py-1 rounded-full border border-[#2563EB]/30">
          <View
            className="w-[8px] h-[8px] rounded-full "
            style={{
              backgroundColor: isSpeaking ? "#3B82F6" : "#64748B",
            }}
          />
          <Text style={{ color: "#CBD5E1", fontSize: 10, fontWeight: "600" }}>
            {judgeName}
          </Text>
        </View>
      </View>
    </View>
  );
}
