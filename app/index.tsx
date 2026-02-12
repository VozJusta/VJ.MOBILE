import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from "react";
import { StatusBar, View, Animated, Easing, Text } from "react-native";
import Logo from "../assets/svg/icons/"
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {

  const scale = useRef(new Animated.Value(1)).current;

useEffect(() => {
    const anim = Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.5,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(scale, {
        toValue: 2,
        duration: 700,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]);

    anim.start(() => {

      router.replace("/screens/onboarding/Onboarding");
    });

    return () => anim.stop();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center  bg-yellowOrange">
      <StatusBar hidden />
      <View className="flex-1 justify-center items-center">
        <Animated.View
          style={{ transform: [{ scale }] }}
          className="items-center justify-center"
        >
          <View className="flex justify-center items-center w-[812px] h-[804px] rounded-full bg-black800">
            <View className="w-[219px] h-[219px] rounded-full absolute justify-center items-center">
              <Logo className="w-[61px] h-[34px]" />
              <Text className="text-[20px] text-offWhite font-nourd_bold">
                Food<Text className="text-yellow500">Bridge</Text>
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
  );
}


