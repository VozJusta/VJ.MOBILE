import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View } from "react-native";

export function OnboardingTemplate() {
  return (
    <>
      <StatusBar translucent />
      <LinearGradient
        className="flex-1 pt-[58px] pr-[16px]"
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <View className="w-full flex items-end">
          <Text className="text-white text-[16px] font-inter">Pular</Text>
        </View>
      </LinearGradient>
    </>
  );
}
