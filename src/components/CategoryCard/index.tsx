import { ICategoryCard } from "@/interfaces/components/CategoryCard";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function CategoryCard(request: ICategoryCard) {
  return (
    <View className="w-full flex-row p-[20px] justify-between items-center bg-[rgb(255,255,255,0.03)] rounded-xl border border-solid border-[rgba(255,255,255,0.1)]">
      <View className="flex-row gap-[16px] items-center">
        <View
          style={{ backgroundColor: request.bgIcon }}
          className="w-[48px] h-[48px] rounded-xl justify-center items-center"
        >
          <MaterialIcons
            name={request.icon}
            size={24}
            color={request.colorIcon}
          />
        </View>
        <View className="flex-col  w-[149px]">
          <Text className="text-[18px] text-white font-interSemiBold">
            {request.title}
          </Text>
          <Text className="text-[12px] text-[#94A3B8] font-interRegular">
            {request.description}
          </Text>
        </View>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#475569" />
    </View>
  );
}
