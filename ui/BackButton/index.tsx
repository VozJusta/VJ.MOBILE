import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/5 rounded-full p-3 border-[1px] border-[rgba(255,255,255,0.12)]">
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    )
}