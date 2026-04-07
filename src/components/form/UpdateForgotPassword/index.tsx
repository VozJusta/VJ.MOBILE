import PasswordStrength from "@/components/PasswordStrengh";
import { ScreensForgotPassword } from "@/interfaces/template/ForgotPasswordTemplate";
import ButtonUI from "@/ui/ButtonUI";
import InputUI from "@/ui/InputUI";
import { View, Text } from "react-native";

export function UpdateForgotPassword() {
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
        value={
          props.screen === ScreensForgotPassword.Update ? props.newPassword : ""
        }
        onChangeText={(e) => {
          if (props.screen === ScreensForgotPassword.Update) {
            props.setNewPassword(e);
          }
        }}
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
        value={
          props.screen === ScreensForgotPassword.Update
            ? props.confirmPassword
            : ""
        }
        onChangeText={(e) => {
          if (props.screen === ScreensForgotPassword.Update) {
            props.setConfirmPassword(e);
          }
        }}
      />
      {props.screen === ScreensForgotPassword.Update &&
        props.passwordStrength && (
          <PasswordStrength
            score={props.passwordStrength.score}
            color={props.passwordStrength.color}
            checklist={props.passwordStrength.checklist}
          />
        )}
      <ButtonUI
        onPress={() =>
          handleValidateCode(props.email, codeAuth, token ? token : "")
        }
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
