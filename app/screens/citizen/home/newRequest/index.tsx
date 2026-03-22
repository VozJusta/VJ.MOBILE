import ButtonAudio from "@/interfaces/components/ButtonAudio";
import ButtonUI from "@/ui/ButtonUI";
import { newRequestData } from "@/utils/home/newRequest/data";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewRequest() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} className="px-[24px]">
        <View className=" gap-[35px] items-center flex-row mt-[32px]">
          <ButtonUI
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            gradient={false}
            hover={false}
            iconLeft={false}
            goBack
            size="w-[40px] h-[40px]"
            paddingButtonStatus={""}
          />
          <Text className="text-[18px] text-white font-interSemiBold">
            Relatar Novo Caso
          </Text>
        </View>
        <View className="flex-col mt-[24px] gap-[16px] w-full">
          <Text className="text-[14px] text-[#94A3B8] font-inter uppercase">
            Selecione uma categoria
          </Text>

          {newRequestData.map((request, index) => (
            <ButtonUI
              key={request.title}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
              gradient={false}
              bg="bg-[rgba(255,255,255,0.03)]"
              size="w-full h-[102px]"
              border="border border-solid border-[rgba(255,255,255,0.08)]"
              children={
                <View className="w-full flex-row p-[20px] justify-between items-center">
                  <View className="flex-row gap-[16px] items-center">
                    <View
                      style={{ backgroundColor: request.bgIcon }}
                      className="w-[48px] h-[48px] rounded-full justify-center items-center"
                    >
                      <MaterialIcons
                        name={request.icon}
                        size={24}
                        color={request.colorIcon}
                      />
                    </View>
                    <View className="flex-col  w-[149px]">
                      <Text className="text-[18px] text-white font-interSemiBold">
                        {request.title}
                      </Text>
                      <Text className="text-[12px] text-[#94A3B8] font-interRegular">
                        {request.description}
                      </Text>
                    </View>
                  </View>
                  <ButtonUI
                    onPress={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    gradient={false}
                    children={
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="#475569"
                      />
                    }
                    hover={false}
                    iconLeft={false}
                    paddingButtonStatus={""}
                  />{" "}
                </View>
              }
              hover={false}
              iconLeft={false}
              paddingButtonStatus={""}
            />
          ))}
        </View>
        <View className="mt-[32px] gap-[16px]">
          <ButtonAudio />
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}
