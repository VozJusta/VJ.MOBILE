import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonUI from "../../../ui/Button";
import Logo from "../../../assets/svg/icons/logo.svg"
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
          <ButtonUI goBack size="w-[40px] h-[40px]" onPress={function (): void {
            throw new Error("Function not implemented.");
          } } gradient={false} hover={false}/>
          <Logo width={40} height={29}/>
        </View>
        
      </SafeAreaView>
    </LinearGradient>
  );
}
