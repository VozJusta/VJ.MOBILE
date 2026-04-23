import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Badge from "../Badge";
import { MaterialIcons } from "@expo/vector-icons";
import { ILawyerCard } from "@/interfaces/components/LawyerCard";

export default function LawyerCard(props: ILawyerCard) {
  const totalStars = 5;
  const rating = props.rating || 0;

  const fullStars = Math.floor(rating);
  const decimal = rating % 1;

  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;

  const roundedFullStars = decimal >= 0.75 ? fullStars + 1 : fullStars;
  return (
    <TouchableOpacity className="flex flex-row gap-3 justify-between items-center bg-[#fff]/3 rounded-3xl border border-[#fff]/10 py-4 px-3" onPress={() => props.onPress?.()}>
      <View className="rounded-full bg-[#0D59F2] border border-[#0B244F] size-16 flex items-center justify-center">
        <Text className="text-white text-[12px] font-interBold">DR</Text>
      </View>
      <View className="flex flex-col gap-1 items-start flex-1">
        <Text className="font-interBold text-[16px] text-white">
          {props.name}
        </Text>
        <View className="flex flex-row gap-1.5 items-center">
          {[...Array(totalStars)].map((_, index) => {
            if (index < roundedFullStars) {
              return (
                <MaterialIcons
                  key={index}
                  name="star"
                  size={16}
                  color="#FBBF24"
                />
              );
            }

            if (index === fullStars && hasHalfStar) {
              return (
                <MaterialIcons
                  key={index}
                  name="star-half"
                  size={16}
                  color="#FBBF24"
                />
              );
            }

            return (
              <MaterialIcons
                key={index}
                name="star-border"
                size={16}
                color="#FBBF24"
              />
            );
          })}

          <Text className="text-white text-[14px] font-interRegular ml-1">
            {rating.toFixed(1)}
          </Text>
        </View>
        <View className="flex flex-row gap-1.5 flex-wrap">
          {props.badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
        </View>
      </View>
      <View className="flex items-center justify-center p-4 bg-[#0D59F2] rounded-2xl">
        <MaterialIcons name="arrow-forward-ios" size={16} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}
