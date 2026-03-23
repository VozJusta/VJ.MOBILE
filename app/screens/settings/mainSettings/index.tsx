import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
} from "react-native";
import ButtonUI from "../../../../ui/ButtonUI";
import Logo from "../../../../assets/svg/icons/logo.svg";
import { router } from "expo-router";

export default function MainSettings() {
  return (
    <>
      <LinearGradient
        style={{ flex: 1, paddingTop: 58 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View className="flex-row justify-between items-center p-4">
              <ButtonUI
                goBack
                size="h-[40px] w-[40px]"
                onPress={() => router.back()}
                gradient={false}
                hover={false}
              />

              <Text className="text-slate-100 text-[14px] text-interMedium">
                Configurações
              </Text>
              <Logo width={40} height={29} />
            </View>

            <View>
              <Text className="uppercase text-slate-400 text-[11px]">
                Preferências do app
              </Text>
              <View>
                
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}
