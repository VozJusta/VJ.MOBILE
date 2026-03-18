import { Text, View } from "react-native";
import Onboarding, { DotProps } from "react-native-onboarding-swiper";
import { onboardingData } from "./data";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import ButtonUI from "@/ui/ButtonUI";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingTemplate() {
  const ref = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();


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
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" flex min-w-full items-end  mb-16">
        <ButtonUI
          onPress={() => router.replace("/screens/Onboarding/roles")}
          gradient={false}
          children={
            <Text className="text-white text-[16px] font-inter pr-[16px]">
              Pular
            </Text>
          }
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
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
            <ButtonUI
              gradient={false}
              goNext
              onPress={() => router.replace("/screens/Onboarding/roles")}
              hover={false}
              size="w-[56px] h-[56px]"
              paddingButtonStatus={""}
              iconLeft={false}
            />
          )}
          NextButtonComponent={() => (
            <ButtonUI
              gradient={false}
              goNext
              onPress={() => ref.current?.goNext()}
              hover={false}
              size="w-[56px] h-[56px]"
              iconLeft={false}
              paddingButtonStatus={""}
            />
          )}
          DotComponent={Dot}
          pages={onboardingData}
        />
      </View>
    </SafeAreaView>
  );
}
