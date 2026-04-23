import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { OtpInput } from "react-native-otp-entry";
import { IInput } from "@/interfaces/ui/InputUI";

export default function InputUI({
  label,
  leftIcon,
  rightIcon,
  rightIconName,
  iconSize,
  iconNameProps,
  iconColor,
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  onRightIconPress,
  inputOTP,
  onFilledOTP,
  onSubmitEditing,
  ...restProps
}: IInput) {
  return inputOTP ? (
    <OtpInput
      autoFocus={false}
      onTextChange={onChangeText}
      onFilled={onFilledOTP}
      numberOfDigits={6}
      theme={{
        containerStyle: {
          gap: 10,
        },
        pinCodeTextStyle: {
          color: "#FAFAFA",
        },
        pinCodeContainerStyle: {
          backgroundColor: "rgba(255,255,255,0.03)",
          width: 41.5,
          height: 41.5,
          borderRadius: 16,
          borderColor: "rgba(255,255,255,0.1)",
        },
      }}
      focusColor={"#FFFF"}
    />
  ) : (
    <View className="w-full ">
      {!!label && (
        <Text className="text-[#fff] text-[12px] font-interBold uppercase mb-[6px]">
          {label}
        </Text>
      )}

      <View
        className={`w-full gap-[13px] h-[55px] px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row items-center`}
      >
        {leftIcon && (
          <MaterialIcons name={iconNameProps} size={iconSize} color={"#fff"} />
        )}

        <TextInput
          className="w-[80%] h-full bg-transparent text-white font-interRegular"
          style={{ fontSize: 14 }}
          placeholderTextColor={"#475569"}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...restProps}
        />

        {rightIcon && (
          <TouchableOpacity
            className="absolute right-4"
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <MaterialIcons
              name={rightIconName || iconNameProps}
              size={iconSize}
              color={iconColor || "#fff"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
