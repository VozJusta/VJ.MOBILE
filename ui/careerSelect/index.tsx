import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { CareerSelectProps } from "../../interfaces/interfaces";
import { useMemo, useState } from "react";

export default function CareerSelect({
  label,
  value,
  options,
  onValueChange,
}: CareerSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    if (!value) {
      return "Selecione sua área";
    }

    return value;
  }, [value]);

  const selectOption = (option: string) => {
    if (value === option) {
      onValueChange("");
      setOpen(false);
      return;
    }

    onValueChange(option);
    setOpen(false);
  };

  return (
    <View className="w-full">
      <Text className="text-[#fff] text-[10px] font-interBold uppercase mb-[6px]">
        {label}
      </Text>

      <TouchableOpacity
        className="w-full h-[55px] px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row items-center justify-between"
        onPress={() => setOpen((prev) => !prev)}
      >
        <View className="flex-row items-center gap-3 flex-1 pr-2">
          <MaterialIcons name="gavel" size={24} color="#fff" />
          <Text
            className={`text-[14px] ${value ? "text-white" : "text-[#fff]"}`}
            numberOfLines={1}
          >
            {selectedLabel}
          </Text>
        </View>
        <MaterialIcons
          name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {open && (
        <View className="mt-2 border border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] px-4 py-3">
          <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
            <View className="gap-2">
              {options.map((option) => {
                const selected = value === option;

                return (
                  <TouchableOpacity
                    key={option}
                    className="flex-row items-center gap-2"
                    onPress={() => selectOption(option)}
                  >
                    <MaterialIcons
                      name={selected ? "radio-button-checked" : "radio-button-unchecked"}
                      size={20}
                      color={selected ? "#34D399" : "#94A3B8"}
                    />
                    <Text
                      className={`text-[13px] ${selected ? "text-[#34D399]" : "text-[#94A3B8]"}`}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
