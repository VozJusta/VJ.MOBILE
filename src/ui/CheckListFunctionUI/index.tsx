import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function CheckListFunctionUI({ valid, label }: { valid: boolean, label: string }) {
    return (
        <View className="flex-row items-center gap-2">
            <MaterialIcons name={valid ? "check-circle" : "radio-button-unchecked"}
                size={18}
                color={valid ? "#34D399" : "#94A3B8"} />

            <Text className="font-inter text-[12px]" style={{ color: valid ? "#34D399" : "#94A3B8" }}>{label}</Text>
        </View>
    )
}