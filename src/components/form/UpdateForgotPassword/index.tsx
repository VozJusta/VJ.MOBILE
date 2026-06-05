import PasswordStrength from "@/components/PasswordStrengh";
import { useAuth } from "@/hooks/auth/useAuth";
import { IUpdateForgotPassword } from "@/interfaces/components/Forms/forgotPassword";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export function UpdateForgotPassword({ ...props }: IUpdateForgotPassword) {
  const { loading } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
        iconSize={24}
        iconNameProps={"lock"}
        type={"password"}
        secureTextEntry={isOpen ? false : true}
        rightIcon
        rightIconName={!isOpen ? "visibility-off" : "visibility"}
        onRightIconPress={() => setIsOpen(!isOpen)}
        value={props.newPassword}
        onChangeText={(e) => props.setNewPassword(e)}
      />
      <InputUI
        label="Confirme a nova senha"
        placeholder={"••••••••"}
        leftIcon
        iconSize={24}
        iconNameProps={"lock"}
        secureTextEntry={confirmPassword ? false : true}
        type={"password"}
        rightIcon
        rightIconName={!confirmPassword ? "visibility-off" : "visibility"}
        onRightIconPress={() => setConfirmPassword(!confirmPassword)}
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
        onPress={() => props.onSubmit()}
        gradient={true}
        hover={false}
        iconLeft={false}
        paddingButtonStatus={""}
      >
        <View className="flex-1 justify-center items-center">
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text className="text-[16px] font-interBold text-white">
              {props.labelButton || "Redefinir senha"}
            </Text>
          )}
        </View>
      </ButtonUI>
    </>
  );
}
