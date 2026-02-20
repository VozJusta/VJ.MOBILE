import { LinearGradient } from "expo-linear-gradient";
import {
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Onboarding, { DotProps } from "react-native-onboarding-swiper";
import { onboardingData } from "./data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import ButtonUI from "../../ui/Button";

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
      className="flex-1 pt-[58px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <View className="w-full items-end mb-16">
        <ButtonUI
          onPress={() => router.replace("/screens/Onboarding/roles")}
          gradient={false}
          children={
            <Text className="text-white text-[16px] font-inter pr-[16px]">
              Pular
            </Text>
          }
        />
      </View>
      <View className="flex-1  ">
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
            <ButtonUI
              gradient={false}
              goNext
              onPress={() => router.replace("/screens/Onboarding/roles")}
            />
          )}
          NextButtonComponent={() => (
            <ButtonUI
              gradient={false}
              goNext
              onPress={() => ref.current?.goNext()}
            />
          )}
          DotComponent={Dot}
          pages={onboardingData}
        />
      </View>
    </LinearGradient>
  );
}
