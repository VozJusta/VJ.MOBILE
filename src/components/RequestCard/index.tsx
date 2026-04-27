import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Badge from "../Badge";
import ButtonUI from "@/ui/ButtonUI";

import { router, usePathname } from "expo-router/build/exports";
import {
  IRequestCard,
  RequestCardTextBadge,
} from "@/interfaces/components/RequestCard";
import { getCategoryLabel } from "@/utils/screens/citizen/home";

export default function RequestCard({ ...props }: IRequestCard) {
  const pathname = usePathname();

  return (
    <TouchableOpacity
      className="flex flex-col w-full h-fit border-l-4 rounded-xl p-5 bg-[#161E29]/70 gap-6"
      style={{ borderLeftColor: props.badgeColor }}
      onPress={() =>
        pathname === "/screens/lawyer/requests" &&
        router.push(
          `/screens/lawyer/requests/requestSelected/${props.caseId}`,
        )
      }
    >
      <View className="flex flex-row justify-between items-start w-full">
        <View className="flex flex-col gap-2 text-start">
          <Text
            className="font-interSemiBold text-[12px]"
            style={{ color: props.badgeColor }}
          >
            {getCategoryLabel(props.category_detected)}
          </Text>
          <Text className="font-interBold text-[16px] text-[#FFFFFF]">
            {props.title ? props.title : "Sem título"}
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
            {props.clientName}
          </Text>
          <Text className="font-inter text-[12px] text-[#94A3B8]">
            Solicitado em {props.created_at}
          </Text>
        </View>
      </View>
      {props.textBadge === RequestCardTextBadge.ACCEPTED && (
        <ButtonUI
          paddingButtonStatus="0"
          gradient
          hover={false}
          onPress={() => props.onSeeReport && props.onSeeReport()}
          iconLeft={true}
          iconName="remove-red-eye"
          children={
            <View className="flex flex-row items-center gap-2 w-full justify-center h-full">
              <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                VER DOSSIÊ
              </Text>
            </View>
          }
        />
      )}

      {props.textBadge === RequestCardTextBadge.PENDING && (
        <View className="flex flex-col gap-3">
          <ButtonUI
            disabled={props.isAccepting || props.isRejecting}
            paddingButtonStatus="0"
            gradient
            hover={false}
            onPress={() => props.onAccept && props.onAccept()}
            iconLeft={false}
            children={
              <View className="flex flex-row items-center gap-2 w-full justify-center h-full">
                {props.isAccepting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                    ACEITAR
                  </Text>
                )}
              </View>
            }
          />
          <ButtonUI
            disabled={props.isAccepting || props.isRejecting}
            paddingButtonStatus="0"
            gradient
            hover={false}
            onPress={() => props.onReject && props.onReject()}
            iconLeft={false}
            children={
              <View className="flex flex-row items-center gap-2 w-full justify-center h-full bg-[#EF4444]">
                {props.isRejecting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="font-interSemiBold text-[16px] text-[#FFFFFF]">
                    RECUSAR
                  </Text>
                )}
              </View>
            }
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
