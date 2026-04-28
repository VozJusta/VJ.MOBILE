import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { IPaginationComponent } from "@/interfaces/components/Pagination";

export default function Pagination({ ...props }: IPaginationComponent) {
  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, props.page - Math.floor(maxVisible / 2));
    let end = Math.min(props.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = getPageNumbers();

  return (
    <View className="flex-row items-center justify-between w-full mt-4 bg-[rgb(255,255,255,0.03)] border border-solid border-[rgba(255,255,255,0.1)] rounded-[16px] px-[16px] py-[12px]">
      <TouchableOpacity
        onPress={props.goToPreviousPage}
        disabled={!props.hasPreviousPage || props.loading}
        className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
          props.hasPreviousPage && !props.loading
            ? "bg-white/5 border border-solid border-white/10"
            : "bg-transparent opacity-30"
        }`}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <View className="flex-row items-center gap-3">
        {pageNumbers.map((num) => (
          <TouchableOpacity
            onPress={() => props.goToPage(num)}
            key={num}
            disabled={props.loading}
            className={`w-[40px] h-[40px] rounded-[12px] justify-center items-center ${
              props.page === num
                ? "bg-[#2563EB]"
                : "bg-white/5 border border-solid border-white/10"
            } ${props.loading ? "opacity-50" : ""}`}
          >
            <Text
              className={`font-interBold text-[16px] ${props.page === num ? "text-white" : "text-[#94A3B8]"}`}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}

        {pageNumbers[pageNumbers.length - 1] < props.totalPages && (
          <Text className="text-[#94A3B8] font-interBold text-[16px]">...</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={props.goToNextPage}
        disabled={!props.hasNextPage || props.loading}
        className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
          props.hasNextPage && !props.loading
            ? "bg-[#2563EB]"
            : "bg-transparent opacity-30 border border-solid border-white/10"
        }`}
        style={
          props.hasNextPage &&
          !props.loading && {
            shadowColor: "#1E3A8A",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
          }
        }
      >
        <MaterialIcons name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
