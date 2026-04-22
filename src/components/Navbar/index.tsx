import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import ButtonUI from "@/ui/ButtonUI";
import { usePathname, useRouter } from "expo-router";
import { NavbarItemsCitizen, NavbarItemsLawyer } from "@/utils/components/Navbar";

export default function Navbar({
  isLawyer,
  profile,
}: {
  isLawyer: boolean;
  profile: boolean;
}) {
const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="bg-[#161E29] rounded-[16px] flex-row border border-solid border-[rgba(255,255,255,0.1)] w-[343px] h-[64px] absolute bottom-6 justify-between items-center self-center px-[16px] mb-6 py-[9.5px] ">
      {!isLawyer
        ? NavbarItemsCitizen.map((item, index) => {
            const activeItem = pathname === item.path;
            const profileIndex = NavbarItemsCitizen.length - 1;
            return (
              <ButtonUI
                key={ item.path }
                children={
                  <View className="flex-col gap-[4px] items-center">
                    <MaterialIcons
                      name={item.iconName}
                      size={24}
                      color={activeItem ? "#2563EB" : "#64748B"}
                    />
                    <Text
                      className={`${activeItem ? "text-[#2563EB]" : "text-[#64748B]"} text-[10px] font-inter`}
                    >
                      {item.name}
                    </Text>
                  </View>
                }
                onPress={() => {
                  router.push(item.path);
                }}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            );
          })
        : NavbarItemsLawyer.map((item, index) => {
            const activeItem = pathname === item.path;
            return (
              <ButtonUI
                key={item.path}
                children={
                  <View className="flex-col gap-[4px] items-center">
                    <MaterialIcons
                      name={item.iconName}
                      size={24}
                      color={activeItem ? "#2563EB" : "#64748B"}
                    />
                    <Text
                      className={`${activeItem ? "text-[#2563EB]" : "text-[#64748B]"} text-[10px] font-inter`}
                    >
                      {item.name}
                    </Text>
                  </View>
                }
                onPress={() => {
                  router.push(item.path);
                }}
                gradient={false}
                hover={false}
                iconLeft={false}
                paddingButtonStatus={""}
              />
            );
          })}
    </View>
  );
}
