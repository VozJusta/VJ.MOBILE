import Header from "@/components/Header";
import { useAuth } from "@/hooks/auth/useAuth";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function TerminateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const { terminateAccount, loading } = useAuth();

  const handleTerminateAccount = async () => {
    if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: "Senha obrigatória",
        text2: "Por favor, digite sua senha para continuar",
      });
      return;
    }

    await terminateAccount(password);
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title="ENCERRAR CONTA" isFirstPage={false} isCitizen={false} />

      <View className="flex-1 items-center justify-center">
        <View className="w-full bg-[#1E293B]/40 border border-[rgba(255,255,255,0.12)] rounded-[24px] gap-[24px] py-12 px-4">
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
            onPress={handleTerminateAccount}
            gradient={false}
            hover={false}
            bg="bg-[#EA2027]"
            border="border border-[#F04444]"
            size={"h-[56px] w-full rounded-[16px]"}
            iconLeft={false}
            paddingButtonStatus={"px-[20px]"}
          >
            <View className="w-full h-full items-center justify-center">
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text className={"text-[14px] font-interBold text-white"}>
                  Excluir conta
                </Text>
              )}
            </View>
          </ButtonUI>
        </View>
      </View>
    </SafeAreaView>
  );
}