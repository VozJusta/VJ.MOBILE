import Header from "@/components/Header";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TerminateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Header title="Encerrar conta" isFirstPage={false} isCitizen={false} />

      <View className="self-center w-full mt-8 px-4 bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-12">
        <View className="flex-col gap-2">
          <Text className="text-white text-[24px] font-interBold">
            Encerrar conta
          </Text>
          <Text className="text-[#94A3B8] text-[14px] font-interRegular leading-7">
            Digite sua senha para continuar com a exclusão da conta. Essa ação é
            permanente e não pode ser desfeita. Todos os seus dados serão
            removidos.
          </Text>
        </View>

        <InputUI
          label="SENHA"
          placeholder={"••••••••"}
          leftIcon
          keyboardType="visible-password"
          iconSize={24}
          iconNameProps={"lock"}
          type={"password"}
          secureTextEntry={!showPassword}
          rightIcon
          rightIconName={showPassword ? "visibility-off" : "visibility"}
          onRightIconPress={() => setShowPassword(!showPassword)}
          value={password}
          onChangeText={(e) => setPassword(e)}
        />

        <ButtonUI
          onPress={dangerCard.onPress ?? (() => {})}
          gradient={false}
          hover={false}
          bg="bg-[#EA2027]"
          border="border border-[#F04444]"
          size={"h-[56px] w-full rounded-[16px]"}
          iconLeft={false}
          paddingButtonStatus={"px-[20px]"}
        >
          <View className="w-full h-full items-center justify-center">
            <Text className={"text-[16px] tracking-[0.8px]"}>
              Excluir conta
            </Text>
          </View>
        </ButtonUI>
      </View>
    </SafeAreaView>
  );
}
