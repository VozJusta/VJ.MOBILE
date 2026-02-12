import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, Text } from "react-native";
import Logo from "../assets/svg/icons/logo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(scale, {
        toValue: 2,
        duration: 400,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]);

    anim.start(() => {});

    return () => anim.stop();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <LinearGradient
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <Animated.View
          style={{ transform: [{ scale }] }}
          className="items-center justify-center"
        >
          <View className="flex justify-center items-center w-[812px] h-[804px] rounded-full bg-black800">
            <Logo width={70} height={51}/>
          </View>
        </Animated.View>
      </LinearGradient>
    </>
  );
}
