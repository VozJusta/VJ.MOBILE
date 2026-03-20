import { IButtonProfile } from "@/interfaces/interfaces";
import ButtonUI from "@/ui/ButtonUI";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function ProfileButton({ ...item }: IButtonProfile) {
  return (
    <ButtonUI
      key={item.namebutton}
      children={
        <View className={`min-w-full flex-row ${item.NextButton ? "justify-between items-center" : "justify-start items-start"}`}>
          <View className={`flex-row gap-[16px] items-center`}>
            <View
              style={{ backgroundColor: item.bgIcon }}
              className={`w-[40px] h-[40px] justify-center items-center rounded-[8px] `}
            >
              <MaterialIcons
                name={item.icon}
                color={item.colorIcon}
                size={24}
              />
            </View>
            <Text className="font-inter text-[16px] text-white">
              {" "}
              {item.namebutton}
            </Text>
          </View>
          {item.NextButton && (
            <ButtonUI
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
              gradient={false}
              hover={false}
              bg="bg-white/5"
              border="border border-solid border-white/10 rounded-full"
              size="w-[30px] h-[30px]"
              children={
                <View className="flex-1 justify-center items-center">
                  <MaterialIcons
                    name={"chevron-right"}
                    size={24}
                    color="#fff"
                  />
                </View>
              }
              iconLeft={false}
              paddingButtonStatus={""}
            />
          )}
        </View>
      }
      onPress={() => item.path}
      gradient={false}
      hover={false}
      iconLeft={false}
      paddingButtonStatus={""}
    />
  );
}
