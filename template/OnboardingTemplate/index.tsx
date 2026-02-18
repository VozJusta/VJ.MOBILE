import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View, Image, Dimensions } from "react-native";
import Onboarding, { DotProps } from "react-native-onboarding-swiper";
import { onboardingData } from "./data";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function OnboardingTemplate() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const isLast = index === onboardingData.length - 1;

  const Dot = ({ selected }:DotProps) => {
    return (
      <View
        style={{
          width: selected ? 18 : 6,
          height: 6,
          borderRadius: 3,
          marginHorizontal: 4,
          backgroundColor: selected ? "#135BEC" : "#555",
          boxShadow: selected ? "0px 0px 10px 0px rgba(19, 91, 236, 0.5)" : "none",
        }}
      />
    );
  };

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
            showSkip={false}
            onNext={() => router.replace("/home")}
            containerStyles={{
              paddingTop: 0,
              justifyContent: "flex-start",
               backgroundColor: "transparent",
            }}
            imageContainerStyles={{
              marginBottom: 61
            }}
            bottomBarColor="transparent"
            DotComponent={Dot}
            pages={onboardingData}
          />
        </View>
      </LinearGradient>
    </>
  );
}
