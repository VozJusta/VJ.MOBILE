import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function BackButton() {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/5 rounded-full p-3 border-[1px] border-[rgba(255,255,255,0.12)]">
            <MaterialIcons className="left-1" name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
    )
}