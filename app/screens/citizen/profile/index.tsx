import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileCitizen() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="pt-[32px] px-[16px] gap-[32px]"
    >
      <View className="w-full  flex-row justify-between ">
        <Text className="text-[#F1F5F9] uppercase text-[14px] font-inter">
          Perfil do Cidadão
        </Text>
        <Logo width={40} height={29} />
      </View>
      <View className="w-full justify-center items-center gap-[16px]">
         <LinearGradient
              style={{width:112, height: 112, borderRadius: 100, position: "relative", zIndex: 10, justifyContent: "center", alignItems: "center"}}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0. }}
              colors={["#1D4ED8", "#60A5FA"]}
            >
                <View className=" rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] bg-[#1E293B] justify-center items-center">
                <MaterialIcons name="person" size={48} color={"#8E8E93"}/>
                </View>
            </LinearGradient>

        </View>
    </SafeAreaView>
  );
}
