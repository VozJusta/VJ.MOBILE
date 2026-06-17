import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import Svg, { Rect, Circle } from "react-native-svg";
import Robot from "@/assets/svg/icons/robot.svg";
const BAR_COUNT = 9;
const BAR_CONFIGS = [
  { baseHeight: 12, modifier: 0.5 },
  { baseHeight: 28, modifier: 0.7 },
  { baseHeight: 40, modifier: 0.9 },
  { baseHeight: 52, modifier: 1.1 },
  { baseHeight: 60, modifier: 1.3 },
  { baseHeight: 52, modifier: 1.1 },
  { baseHeight: 40, modifier: 0.9 },
  { baseHeight: 28, modifier: 0.7 },
  { baseHeight: 12, modifier: 0.5 },
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
    <View
    className="w-full h-[180px] flex flex-col items-center bg-[#0F1929] rounded-[16px] border border-solid border-[#1E3A5F] gap-4 "
    >
      <Robot />

      {/* Audio bars */}
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

      {/* Badge */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: "#1E3A5F",
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: isSpeaking ? "#3B82F6" : "#64748B",
          }}
        />
        <Text style={{ color: "#CBD5E1", fontSize: 13, fontWeight: "600" }}>
          {judgeName}
        </Text>
      </View>
    </View>
  );
}
