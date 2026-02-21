import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity } from "react-native";
import { ButtonProps } from "../../interfaces/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

export default function ButtonUI({ goNext = false, ...props }: ButtonProps) {
  return goNext ? (
    <TouchableOpacity
      className={`w-[56px] bg-BlueAzure rounded-full justify-center items-center h-[56px]`}
      onPress={props.onPress}
      style={{
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
  ) : props.gradient ? (
    <LinearGradient
      className={`w-full h-[56px]`}
      style={{
        borderRadius:16,
        shadowColor: "#135BEC",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#135BEC", "#0A44B8"]}
    >
      <Pressable
        onPress={props.onPress}
        className={`w-full h-[56px]`}
      >
        {props.children}
      </Pressable>
    </LinearGradient>
  ) : (
    <Pressable
      onPress={props.onPress}
      className={` rounded-[20px] ${props.size} ${props.hover ? ` ${props.active ? "" : "border border-[rgba(255,255,255,0.12)]"} ${props.active ? props.bg : "bg-[rgba(255,255,255,0.06)]"}` : ""} `}
    >
      {props.children}
    </Pressable>
  );
}
