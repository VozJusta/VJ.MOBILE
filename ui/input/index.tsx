import { AppInputProps } from '../../interfaces/interfaces';
import { View, Text, TextInput } from 'react-native';
import { formatCPF, formatPhone } from '../../app/utils/mask';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export const AppInput: React.FC<AppInputProps> = ({ label, type = "name", value, onChangeText, ...rest }) => {
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
      <MaterialIcons name={type === "email" ? "email" : type === "phone" ? "smartphone" : type === "cpf" ? "badge" : "person"} size={20} color="#475569" className='absolute left-3 top-[31px] z-10' />
      <Text className='text-[12px] mb-1.5 font-interBold text-white'>{label}</Text>
      <TextInput className='bg-[rgba(255,255,255,0.03)] w-full h-55 text-[14px] text-white border-[1px] pl-12 border-[rgba(255,255,255,0.12)] rounded-[12px]' placeholderTextColor="#475569" value={value} onChangeText={handleChange} keyboardType={getKeyboardType()} secureTextEntry={isPassword} {...rest} />

    </View>
  )
} 
