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
import { OnboardingRef } from "../../interfaces/interfaces";

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
        <Text className="text-white text-[16px] font-inter pr-[16px]">
          Pular
        </Text>
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
            <View
              style={{
                shadowColor: "#1E3A8A",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 8,
              }}
              className="w-14 h-14 bg-[#135BEC] rounded-full items-center mr-[16px] justify-center"
            >
              <MaterialIcons name="chevron-right" size={24} color="#fff" />
            </View>
          )}
          NextButtonComponent={() => (
            <TouchableOpacity
              onPress={() => ref.current?.goNext()}
              style={{
                width: 56,
                height: 56,
                backgroundColor: "#135BEC",
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#1E3A8A",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 8,
                marginRight: 16,
              }}
            >
              <MaterialIcons name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          DotComponent={Dot}
          pages={onboardingData}
        />
      </View>
    </LinearGradient>
  );
}
