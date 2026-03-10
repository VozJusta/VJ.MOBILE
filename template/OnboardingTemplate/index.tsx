import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
} from "react-native";
import Onboarding, { DotProps } from "react-native-onboarding-swiper";
import { onboardingData } from "./data";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import Button from "../../ui/ButtonUI";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingTemplate() {
  const ref = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const isLast = index === onboardingData.length - 1;

  const Dot = ({ selected }: DotProps) => {
    return (
      <View
        style={{
          width: selected ? 24 : 8,
          height: 8,
          borderRadius: 3,
          marginHorizontal: 4,
          backgroundColor: selected ? "#135BEC" : "#555",
          boxShadow: selected
            ? "0px 0px 10px 0px rgba(19, 91, 236, 0.5)"
            : "none",
        }}
      />
    );
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex-1 pt-[58px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className="items-end w-full mb-16">
          <Button
            onPress={() => router.replace("/screens/Onboarding/roles")}
            gradient={false}
            size="w-[56px] h-[56px]"
            children={
              <Text className="text-white text-[16px] font-inter absolute top-[-30px] right-[16px]">
                Pular
              </Text>
            }
            hover={false}
          />
        </View>
        <View className="flex-1">
          <Onboarding
            ref={ref}
            showSkip={false}
            containerStyles={{
              paddingTop: 0,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "transparent",
              paddingHorizontal: 16,
            }}
            imageContainerStyles={{
              marginBottom: 0,
            }}
            bottomBarColor="transparent"
            showDone
            bottomBarHighlight={false}
            bottomBarHeight={100}
            controlStatusBar={false}
            DoneButtonComponent={() => (
              <Button
                gradient={false}
                goNext
                size="w-[56px] h-[56px]"
                onPress={() => router.replace("/screens/Onboarding/roles")}
                hover={false}
              />
            )}
            NextButtonComponent={() => (
              <Button
                gradient={false}
                goNext
                onPress={() => ref.current?.goNext()}
                hover={false}
                size="w-[56px] h-[56px]"
              />
            )}
            DotComponent={Dot}
            pages={onboardingData}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>

  );
}