import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Logo from "../../../../assets/svg/icons/logo.svg";

export default function SelectionUserRole() {
  return (
    <LinearGradient
      className="flex-1 items-center pt-[90px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <View className=" items-center">
        <Logo width={70} height={51} />
        <Text className=" text-[36px] text-white font-montserratBold">
          VozJusta  
        </Text>
      </View>
      <Text className="text-[18px] font-interSemiBold text-white mt-[72px]">
        A justiça agora fala sua língua.
      </Text>
      <Text className="text-[14px] font-inter text-white mt-[8px]">
        Para começar, quem você é?
      </Text>
    </LinearGradient>
  );
}
