import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function BackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white/5 rounded-full p-3 border-[1px] border-[rgba(255,255,255,0.12)]">
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    )
}