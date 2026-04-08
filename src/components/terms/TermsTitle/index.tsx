import { TermsTitleProps } from "@/interfaces/components/terms/TermsTitle";
import { View, Text } from "react-native";

export default function TermsTitle(props: TermsTitleProps) {
  return (
    <View className="flex flex-row w-full h-fit gap-4 items-center">
      <View className="flex items-center justify-center w-fit h-fit rounded-lg bg-[#135BEC]/10 p-2">
        <Text className="text-[16px] font-interBold text-[#135BEC]">
          0{props.number}
        </Text>
      </View>
      <Text className="text-white text-[16px] font-interBold">
        {props.title}
      </Text>
    </View>
  );
}
