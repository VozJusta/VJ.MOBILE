import { ICategoryCard } from "@/interfaces/components/CategoryCard";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export default function CategoryCard(request: ICategoryCard) {
  return (
    <TouchableOpacity
      onPress={request.onPress}
      activeOpacity={0.7}
      className={`w-full flex-row p-[20px] gap-2  justify-between items-center rounded-xl border border-solid border-[rgba(255,255,255,0.1)] ${
        request.isSelected
          ? "bg-[rgba(19,91,236,0.1)] " 
          : "bg-[rgb(255,255,255,0.03)] " 
      }`}
    >
      <View className="flex-row gap-[16px] items-center flex-1">
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
        <View className="flex-1">
          <Text className="text-[18px] text-white font-interSemiBold">
            {request.title}
          </Text>
          <Text className="text-[12px] text-[#94A3B8] font-interRegular">
            {request.description}
          </Text>
        </View>
      </View>
      <MaterialIcons 
        name={request.isSelected ? "radio-button-checked" : "radio-button-unchecked"} 
        size={24} 
        color={request.isSelected ? "#135BEC" : "#475569"} 
      />
    </TouchableOpacity>
  );
}
