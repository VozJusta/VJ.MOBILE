import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View, Image, Dimensions } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { onboardingData } from "./data";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function OnboardingTemplate() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const isLast = index === onboardingData.length - 1;

  return (
    <>
      <StatusBar translucent />
      <LinearGradient
        className="flex-1 pt-[58px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <View className="w-full items-end mb-16">
          <Text className="text-white text-[16px] font-inter pr-[16px]">
            Pular
          </Text>
        </View>
        <View className="flex-1 items-center ">
          <Onboarding
            ref={ref}
            onNext={() => router.replace("/home")}
            DotComponent={}
            containerStyles={{
              paddingTop: 0,
              justifyContent: "flex-start",
            }}
            imageContainerStyles={{
              marginBottom: 61
            }}
            pages={onboardingData}
          />
        </View>
      </LinearGradient>
    </>
  );
}
