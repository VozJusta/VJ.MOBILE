import { Text, TouchableOpacity, View } from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import ButtonUI from "@/ui/ButtonUI";
import { IHeader } from "@/interfaces/components/Header";

export default function Header({ ...props }: IHeader) {
  const router = useRouter();
  const thisPath = usePathname();
  const isConcluedPage =
    thisPath.includes("audienceCompleted") ||
    thisPath.includes("analysysConcluded")
      ? true
      : false;

      const routersForHeader = isConcluedPage?  () => router.push("/screens/citizen/home") 
  : () => router.back();

  return (
    <View className="w-full justify-between flex-row items-center">
      {props.isFirstPage ? (
        <Logo width={40} height={29} />
      ) : (
        <ButtonUI
          goBack
          size="w-[40px] h-[40px]"
          onPress={() => routersForHeader()}
          gradient={false}
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        />
      )}
      <Text className="font-interBold text-[14px] text-[#94A3B8]">
        {props.title}
      </Text>
      {props.isFirstPage ? (
        <TouchableOpacity
          onPress={() =>
            router.push(
              props.isCitizen
                ? "screens/citizen/notifications"
                : "screens/lawyer/notifications",
            )
          }
          className="min-w-[40px] min-h-[40px] rounded-full justify-center items-center bg-[rgba(37,99,235,0.2)] border border-solid border-[rgba(37,99,235,0.3)]"
        >
          <MaterialIcons name="notifications" size={20} color="#2563EB" />
        </TouchableOpacity>
      ) : (
        <Logo width={40} height={29} />
      )}
    </View>
  );
}
