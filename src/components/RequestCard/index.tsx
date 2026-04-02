import { View, Text, Alert } from "react-native";
import React from "react";
import Badge from "../Badge";
import ButtonUI from "@/ui/ButtonUI";
import {
  RequestCardProps,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";

export default function RequestCard({ ...props }: RequestCardProps) {
  return (
    <View
      className="flex flex-col w-full h-fit border-l-4 rounded-xl p-5 bg-[#161E29]/70 gap-6"
      style={{ borderLeftColor: props.badgeColor }}
    >
      <View className="flex flex-row justify-between items-start w-full">
        <View className="flex flex-col gap-2 text-start">
          <Text
            className="font-interSemiBold text-[12px]"
            style={{ color: props.badgeColor }}
          >
            {props.area}
          </Text>
          <Text className="font-interBold text-[16px] text-[#FFFFFF]">
            {props.nameCase}
          </Text>
        </View>
        <Badge textBadge={props.textBadge} badgeColor={props.badgeColor} />
      </View>
      <View className="flex flex-row gap-3 items-center">
        <View className="rounded-full p-3 flex items-center justify-center bg-[#2B86EE]">
          <Text className="font-interBold text-[12px] text-white">RR</Text>
        </View>
        <View className="flex flex-col">
          <Text className="font-interSemiBold text-[14px] text-white">
            {props.nameCitizen}
          </Text>
          <Text className="font-inter text-[12px] text-[#94A3B8]">
            Solicitado em {props.requestDate}
          </Text>
        </View>
      </View>
      {props.textBadge === RequestCardTextBadge.ACCEPTED && (
        <ButtonUI
          paddingButtonStatus="0"
          gradient
          hover={false}
          onPress={() => Alert.alert("Dossiê aberto.")}
          iconLeft={true}
          iconName="remove-red-eye"
          children={
            <View className="flex flex-row items-center gap-2 w-full justify-center h-full">
              <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                ACEITAR
              </Text>
            </View>
          }
        />
      )}

      {props.textBadge === RequestCardTextBadge.PENDING && (
        <View className="flex flex-col gap-3">
          <ButtonUI
            paddingButtonStatus="0"
            gradient
            hover={false}
            onPress={() => Alert.alert("Caso aceito")}
            iconLeft={false}
            children={
              <View className="flex flex-row items-center gap-2 w-full justify-center h-full">
                <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                  ACEITAR
                </Text>
              </View>
            }
          />
          <ButtonUI
            paddingButtonStatus="0"
            gradient
            hover={false}
            onPress={() => Alert.alert("Caso recusado.")}
            iconLeft={false}
            children={
              <View className="flex flex-row items-center gap-2 w-full justify-center h-full bg-[#EF4444]">
                <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                  RECUSAR
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
