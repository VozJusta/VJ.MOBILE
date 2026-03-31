import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { NavbarItemsCitizen, NavbarItemsLawyer } from "./data";
import ButtonUI from "@/ui/ButtonUI";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Navbar({ isLawyer }: { isLawyer: boolean }) {
  const [isActive, setIsActive] = useState(0);
  const router = useRouter();

  return (
    <View className="bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row  border boder-solid border-[rgba(255,255,255,0.1)] w-[343px] h-[64px] absolute bottom-8 justify-between items-center self-center mb-8 px-[16px] py-[9.5px] ">
      {!isLawyer
        ? NavbarItemsCitizen.map((item, index) => {
            const activeItem = isActive === index;
            return (
              <ButtonUI
                key={index}
                children={
                  <View className="flex-col gap-[4px] items-center">
                    <MaterialIcons
                      name={item.iconName}
                      size={24}
                      color={activeItem ? "#2563EB" : "#64748B"}
                    />
                    <Text
                      className={`${activeItem ? "text-[#2563EB]" : "text-[#64748B]"} text-[10px] font-inter`}
                    >
                      {item.name}
                    </Text>
                  </View>
                }
                onPress={() => {
                  setIsActive(index);
                  router.push(item.path);
                }}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            );
          })
        : NavbarItemsLawyer.map((item, index) => {
            const activeItem = isActive === index;
            return (
              <ButtonUI
                key={index}
                children={
                  <View className="flex-col gap-[4px] items-center">
                    <MaterialIcons
                      name={item.iconName}
                      size={24}
                      color={activeItem ? "#2563EB" : "#64748B"}
                    />
                    <Text
                      className={`${activeItem ? "text-[#2563EB]" : "text-[#64748B]"} text-[10px] font-inter`}
                    >
                      {item.name}
                    </Text>
                  </View>
                }
                onPress={() => {
                  setIsActive(index);
                  router.push(item.path);
                }}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            );
          })}
    </View>
  );
}
