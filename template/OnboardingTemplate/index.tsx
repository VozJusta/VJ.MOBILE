import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, View, Image } from "react-native";
import ConnectionIllustration from "../../assets/png/ConnectionIllustration.png";
import MaskedView from "@react-native-masked-view/masked-view";

export function OnboardingTemplate() {
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
          <Image source={ConnectionIllustration} />

          <LinearGradient
            style={{ borderRadius: 12 }}
            className="w-full min-h-[200px] flex-col items-center "
            colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.05)"]}
          >
            <LinearGradient
              style={{ height: 4 }}
              className="w-full"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                "rgba(255,255,255,0)",
                "rgba(255, 255, 255, 0.20)",
                "rgba(255,255,255,0)",
              ]}
            ></LinearGradient>
            <Text className=" font-interBold text-white text-[30px] leading-[36px]">
              Conexão <MaskedView   maskElement={<Text className="font-inter">Sem Barreiras</Text>} />
            </Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </>
  );
}
