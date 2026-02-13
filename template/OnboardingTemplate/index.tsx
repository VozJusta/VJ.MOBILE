import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View, Image, Dimensions } from "react-native";
import Onboarding from "react-native-reanimated-carousel";
import { onboardingData } from "./data";
import { useRef, useState } from "react";

const { width } = Dimensions.get("window");

export function OnboardingTemplate() {

  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const isLast = index === onboardingData.length - 1;

  return (
    <>
      <StatusBar translucent />
      <LinearGradient
        className="flex-1 pt-[58px] px-4"
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <View className="w-full flex items-end">
          <Text className="text-white text-[16px] font-inter">Pular</Text>
        </View>
        <View className="mt-32 flex-1 items-center">
          <Onboarding
            ref={ref}
            width={width}
            height={600}
            data={onboardingData}
            onSnapToItem={(i) => setIndex(i)}
            renderItem={({ item }) => (
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </>
  );
}
