import PasswordStrength from "@/components/PasswordStrengh";
import { IUpdateForgotPasswordProps } from "@/interfaces/components/Forms/forgotPassword";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { View, Text } from "react-native";

export function UpdateForgotPassword({...props}:IUpdateForgotPasswordProps) {
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
        value={ props.newPassword }
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
        value={ props.confirmPassword}
        onChangeText={(e) => props.setConfirmPassword(e)
          
        }
      />
      { props.passwordStrength && (
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
        children={
          <View className="flex-1 justify-center items-center">
            <Text className="text-[16px] font-interBold text-white">
              {props.labelButton || "Redefinir senha"}
            </Text>
          </View>
        }
        iconLeft={false}
        paddingButtonStatus={""}
      />
    </>
  );
}
