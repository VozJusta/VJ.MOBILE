import ButtonUI from "@/ui/ButtonUI";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import InputUI from "@/ui/InputUI";
import { casesData } from "@/utils/home/cases/data";

export default function ListCases() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }} className="px-[16px] gap-[32px]">
      <View className="w-full items-center flex-row justify-between ">
        <ButtonUI
          goBack
          size="h-[40px] w-[40px]"
          onPress={() => router.push("/screens/citizen/home")}
          gradient={false}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        />
        <Text className="text-[#F1F5F9] uppercase text-[14px] font-inter">
          todos os casos
        </Text>
        <Logo width={40} height={29} />
      </View>
      <InputUI
        placeholder={"Buscar por título ou status..."}
        iconSize={24}
        iconNameProps={"search"}
        iconColor="#94A3B8"
        leftIcon
        type={"text"}
      />
      <View className="flex-col justify-center w-full gap-[16px]">
        {casesData.map((item) => (
          <ButtonUI
            key={item.title}
            onPress={() => router.push(`/screens/citizen/home/caseSelected/${item.id}`)}
            gradient={false}
            hover={false}
            iconLeft
            iconName={item.icon}
            status={item.status}
            statusBorder
            colorsStatus={item.color}
            children={<Text>{item.title}</Text>}
            paddingButtonStatus={"p-[20px]"}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
