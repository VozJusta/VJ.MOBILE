import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { CareerSelectProps } from "../../interfaces/interfaces";
import { useMemo, useState } from "react";

export default function CareerSelect({
    label,
    values,
    options,
    onValuesChange,
}: CareerSelectProps) {
    const [open, setOpen] = useState(false);

    const selectedLabel = useMemo(() => {
        if (!values.length) {
            return "Selecione sua área";
        }

        return values.join(", ");
    }, [values]);

    const toggleOption = (option: string) => {
        if (values.includes(option)) {
            onValuesChange(values.filter((value) => value !== option));
            return;
        }

        onValuesChange([...values, option]);
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
                        className={`text-[14px] ${values.length ? "text-white" : "text-[#fff]"}`}
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
                <View className="mt-2 border border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] px-4 py-3 gap-2">
                    {options.map((option) => {
                        const selected = values.includes(option);

                        return (
                            <TouchableOpacity
                                key={option}
                                className="flex-row items-center gap-2"
                                onPress={() => toggleOption(option)}
                            >
                                <MaterialIcons
                                    name={selected ? "check-box" : "check-box-outline-blank"}
                                    size={20}
                                    color={selected ? "#34D399" : "#94A3B8"}
                                />
                                <Text className={`text-[13px] ${selected ? "text-[#34D399]" : "text-[#94A3B8]"}`}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
}