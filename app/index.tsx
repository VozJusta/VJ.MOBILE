import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Logo from "../assets/svg/icons/logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    const anim = Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(scale, {
        toValue: 1.7,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]);

    anim.start(() => {
      router.push("/screens/Onboarding");
    });

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
            <Logo width={70} height={51} />
          </View>
        </Animated.View>
      </LinearGradient>
    </>
  );
}
