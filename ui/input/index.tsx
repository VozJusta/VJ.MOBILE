import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IInputProps } from "../../interfaces/ui/Input";

export default function Input({
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
  ...restProps
}: IInputProps) {
  return (
    <View className="w-full mb-[24px]">
      {!!label && (
        <Text className="text-[#fff] text-[10px] font-interBold uppercase mb-[6px]">
          {label}
        </Text>
      )}

      <View
        className={`w-full gap-[13px] h-[55px] px-4 border border-solid border-white/10 bg-[rgba(255,255,255,0.03)] rounded-[16px] flex-row items-center`}
      >
        {leftIcon && (
          <MaterialIcons
            name={iconNameProps}
            size={iconSize}
            color={"#fff"}
          />
        )}

        <TextInput
          className="w-[80%] h-full bg-transparent text-white font-interRegular"
          placeholderTextColor={"#475569"}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
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
