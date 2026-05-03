import { View, Text, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { IAnalysysConcludedTemplate } from "@/interfaces/template/analysysConcludedTemplate";

export default function AnalysysConcludedTemplate(
  props: IAnalysysConcludedTemplate,
) {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <SafeAreaView className="flex-1 items-center justify-between gap-6 h-full">
        <Header
          isFirstPage={false}
          isCitizen={true}
          title={props.titleHeader ? props.titleHeader.toUpperCase() : ""}
        />
        <View className="flex flex-col w-full items-center gap-6">
          <View className="flex w-full flex-col items-center gap-6 bg-[#1152D4]/5 border border-[#1152D4]/20 rounded-3xl p-8 h-fit">
            <View className="flex items-center justify-center w-fit h-fit bg-[#1152D4] rounded-3xl p-6">
              <MaterialIcons color={"#ffffff"} size={48} name="verified" />
            </View>
            <View className="flex flex-col gap-3">
              <Text className="font-interBold text-3xl text-white text-center">
                {props.title}
              </Text>
              <Text className="font-interRegular text-base text-[#94A3B8] text-center">
                {props.description}
              </Text>
            </View>
          </View>
          <View className="flex flex-row w-full items-center justify-center gap-4">
            {props.firstCardProps && props.secondCardProps && (
              <>
                <View className="flex-1 flex flex-col justify-center items-start gap-2 p-4 bg-[#1152D4]/5 border-b border-t border-r border-l-4 border-[#1152D4]/20 rounded-2xl min-h-[132px]">
                  <View className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#1152D4]/20 ">
                    <MaterialIcons name="gavel" color={"#1152D4"} />
                  </View>
                  <Text className="font-inter text-sm text-[#94A3B8]">
                    {props.firstCardProps?.title}
                  </Text>
                  <Text className="font-inter text-base text-white">
                    {props.firstCardProps?.description}
                  </Text>
                </View>
                <View className="flex-1 flex flex-col justify-center items-start gap-2 p-4 bg-[#1152D4]/5 border-b border-t border-r border-l-4 border-[#1152D4]/20 rounded-2xl min-h-[132px]">
                  <View className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#10B981]/20 ">
                    <MaterialIcons name="show-chart" color={"#10B981"} />
                  </View>
                  <Text className="font-inter text-sm text-[#94A3B8]">
                    {props.secondCardProps?.title}
                  </Text>
                  <Text className="font-interSemiBold text-base text-white">
                    {props.secondCardProps?.description}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {props.extraActions}
      </SafeAreaView>
    </ScrollView>
  );
}
