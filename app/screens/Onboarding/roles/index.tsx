import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import Logo from "../../../../assets/svg/icons/logo.svg";
import ButtonUI from "../../../../ui/Button";
import React, { useState } from "react";

export default function SelectionUserRole() {
  const [active, setActive] = useState(false)
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
      <View className="w-full px-[16px] items-center mt-[36px]">
        <ButtonUI hover size="w-full h-[103px]" gradient={false} active={active} bg="bg-white" onPress={() => setActive(!active)}/>

      </View>
    </LinearGradient>
  );
}
