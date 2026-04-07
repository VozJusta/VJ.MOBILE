import PasswordStrength from "@/components/PasswordStrengh";
import { useAuth } from "@/hooks/useAuth";
import { IUpdateForgotPasswordProps } from "@/interfaces/components/Forms/forgotPassword";
import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import { ZodUpdatePasswordTypes } from "@/interfaces/validation/zodTypes";
import { UpdatePassword } from "@/services/auth/forgotPassword/updatePassword";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export function UpdateForgotPassword({ ...props }: IUpdateForgotPasswordProps) {
  const { loading, setLoading } = useAuth();
  const router = useRouter();
  const handleUpdatePassword = async (data: ZodUpdatePasswordTypes) => {
    setLoading(true);

    const response = await UpdatePassword(data);
    console.log("Resposta do CodeSeding:", response);
    if (
      !response.success &&
      response.fields &&
      response.fields[0] === "Código já enviado"
    ) {
      Toast.show({
        type: "error",
        text1: response.fields && response.fields[0],
      });
      router.replace("/screens/auth/ForgotPassword/Code");
      setLoading(false);
      return;
    }
    if (!response.success) {
      Toast.show({
        type: "error",
        text1: response.fields[0],
      });
      setLoading(false);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Código enviado com sucesso!",
    });
    router.replace("/screens/auth/ForgotPassword/Code");
  };
  return (
    <>
      <View className="gap-[7px] w-full items-start">
        <Text className="font-interBold text-[24px] text-white">
          Nova senha
        </Text>
        <Text className="font-interRegular text-[14px] max-w-[300px] text-white/60 ">
          Crie uma nova senha forte para proteger sua conta
        </Text>
      </View>
      <InputUI
        label="Nova senha"
        placeholder={"••••••••"}
        leftIcon
        keyboardType="visible-password"
        iconSize={24}
        iconNameProps={"lock"}
        type={"password"}
        secureTextEntry={true}
        rightIcon
        rightIconName="visibility"
        onRightIconPress={() => {}}
        value={props.newPassword}
        onChangeText={(e) => props.setNewPassword(e)}
      />
      <InputUI
        label="Confirme a nova senha"
        placeholder={"••••••••"}
        leftIcon
        keyboardType="visible-password"
        iconSize={24}
        iconNameProps={"lock"}
        secureTextEntry={true}
        type={"password"}
        rightIcon
        rightIconName="visibility"
        onRightIconPress={() => {}}
        value={props.confirmPassword}
        onChangeText={(e) => props.setConfirmPassword(e)}
      />
      {props.passwordStrength && (
        <PasswordStrength
          score={props.passwordStrength.score}
          color={props.passwordStrength.color}
          checklist={props.passwordStrength.checklist}
        />
      )}
      <ButtonUI
        onPress={() => {}}
        gradient={true}
        hover={false}
        children={
          <View className="flex-1 justify-center items-center">
            <Text className="text-[16px] font-interBold text-white">
              Redefinir senha
            </Text>
          </View>
        }
        iconLeft={false}
        paddingButtonStatus={""}
      />
    </>
  );
}
