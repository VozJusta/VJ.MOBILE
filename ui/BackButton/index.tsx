import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function BackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white/5 px-9 py-5 ">
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    )
}