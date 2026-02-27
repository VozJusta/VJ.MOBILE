import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonUI from "../../../ui/ButtonUI";
import Logo from "../../../assets/svg/icons/logo.svg";
export function ForgotPasswordTemplate() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex-1 pt-[58px]"
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <SafeAreaView className="px-4" style={{ flex: 1 }}>
        <View className="mt-40 mb-8 flex-row justify-between items-center w-full">
          <ButtonUI
            goBack
            size="w-[40px] h-[40px]"
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
            gradient={false}
            hover={false}
          />
          <Logo width={40} height={29} />
        </View>
        <View
          style={{
            boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
          }}
          className="w-full gap-[32px] bg-white/5 rounded-xl min-h-[406px] flex-col items-center border border-solid border-[rgba(255,255,255,0.13)] px-8 py-8"
        >
          <View className="gap-[11.40px] items-center justify-center">
            <Text className="font-interBold text-[24px] text-white">
              Esqueceu a Senha?
            </Text>
            <Text className="font-interRegular text-[14px] text-white/60 text-center">
              Não se preocupe! Informe seu e-mail cadastrado para receber as
              instruções de recuperação.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
