import { TouchableOpacity, View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  children?: React.ReactNode;
};

export function Checkbox({ value, onChange, children }: Props) {

  return (
    <View className="flex-row items-start gap-[12px] mt-[24px]">
      <TouchableOpacity onPress={() => onChange(!value)} activeOpacity={0.8}>
        <View
          className={`w-[20px] h-[20px] rounded border items-center justify-center ${
            value
              ? "bg-blue-600 border-blue-600"
              : "bg-[#fff]/20 border-white/40"
          }`}
        >
          {value && <MaterialIcons name="check" size={14} color="#fff" />}
        </View>
      </TouchableOpacity>

      <View className="flex-1">{children}</View>
    </View>
  );
}
