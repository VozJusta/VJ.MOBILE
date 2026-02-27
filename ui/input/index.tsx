import { AppInputProps } from '../../interfaces/interfaces';
import { View, Text, TextInput } from 'react-native';
import { formatCPF, formatPhone } from '../../app/utils/mask';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from 'react';


export const AppInput: React.FC<AppInputProps> = ({ label, type = "name", value, onChangeText, secureTextEntry, rightIcon, ...rest }) => {
  const handleChange = (text: string) => {
    if (type === "cpf") {
      onChangeText?.(formatCPF(text));
    } else if (type === "phone") {
      onChangeText?.(formatPhone(text));
    } else {
      onChangeText?.(text);
    }
  };

  const getKeyboardType = () => {
    switch (type) {
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      case "cpf":
        return "numeric";
      default:
        return "default";
    }
  };

  const isPassword = type === "password";

  return (
    <View className='w-90% justify-center'>
      <MaterialIcons name={type === "email" ? "email" : type === "phone" ? "smartphone" : type === "cpf" ? "badge" : type === "password" ? "lock-outline" : "person"} size={28} color="#fff" className='absolute left-3 top-[34px]' />
      <Text className='uppercase text-[10px] mb-1.5 font-interBold text-white'>{label}</Text>
      <TextInput
        className='font-inter bg-[rgba(255,255,255,0.03)] w-full h-55 text-[14px] text-white border-[1px] pl-14 py-5 border-[rgba(255,255,255,0.12)] rounded-[12px]'
        placeholderTextColor="#475569"
        value={value}
        onChangeText={handleChange}
        keyboardType={getKeyboardType()}
        secureTextEntry={
          isPassword
            ? secureTextEntry
            : false
        }
        {...rest} />
      {rightIcon && (
        <View className="absolute right-4 top-[36px]">
          {rightIcon}
        </View>
      )}
    </View>
  )
}

