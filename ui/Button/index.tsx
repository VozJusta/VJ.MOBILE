import { LinearGradient } from "expo-linear-gradient";
import { Pressable, TouchableOpacity } from "react-native";
import { ButtonProps } from "../../interfaces/interfaces";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

export default function ButtonUI({ goNext = false, ...props}: ButtonProps) {
  return goNext ? (
    <TouchableOpacity
    className={`w-[56px] bg-BlueAzure rounded-full justify-center items-center ${props.height}`}
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
  ) : (
    <LinearGradient
      className={`w-full ${props.height}`}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#135BEC", "#0A44B8"]}
    >
      <Pressable className={`w-full ${props.height}`}>
        {props.children}
      </Pressable>
    </LinearGradient>
  );
}
