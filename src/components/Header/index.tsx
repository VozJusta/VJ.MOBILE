import { Text, TouchableOpacity, View } from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { HeaderProps } from "@/interfaces/components/Header";

export default function Header({ ...props }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="w-full justify-between flex-row items-center">
      {props.isFirstPage ? (
        <Logo width={40} height={29} />
      ) : (
        <TouchableOpacity
          className="rounded-full bg-[#0A111F] p-2 flex justify-center items-center"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#94A3B8" />
        </TouchableOpacity>
      )}
      <Text className="font-interBold text-[10px] text-[#94A3B8]">
        {props.title}
      </Text>
      {props.isFirstPage ? (
        <View className="min-w-[40px] min-h-[40px] rounded-full justify-center items-center bg-[rgba(37,99,235,0.2)] border border-solid border-[rgba(37,99,235,0.3)]">
          <MaterialIcons name="notifications" size={20} color="#2563EB" />
        </View>
      ) : (
        <Logo width={40} height={29} />
      )}
    </View>
  );
}
