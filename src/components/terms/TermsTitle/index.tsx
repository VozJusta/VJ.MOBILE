import { TermsTitleProps } from "@/interfaces/components/terms/TermsTitle";
import { View, Text } from "react-native";

export default function TermsTitle(props: TermsTitleProps) {
  return (
    <View className="flex flex-row w-full h-fit gap-4 items-start">
      <View className="flex items-center justify-center w-fit h-fit rounded-lg bg-[#135BEC]/10 p-8">
        <Text className="text-[14px] font-interBold text-[#135BEC]">
          {props.number}
        </Text>
      </View>
      <Text className="text-white text-[14px] font-interBold">
        {props.title}
      </Text>
    </View>
  );
}
