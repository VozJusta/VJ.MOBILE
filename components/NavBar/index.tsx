import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function NavBar() {
    return(
        <View className="bg-[rgba(255,255,255,0.03)] w-[343px] h-[64px] bottom-0 top-8 fixed px-[16px] py-[9.5px]">
            <View className="flex-col gap-[4px]">
                <MaterialIcons name="home" size={24} color={"#2563EB"}/>

            </View>
            
        </View>
    )
}