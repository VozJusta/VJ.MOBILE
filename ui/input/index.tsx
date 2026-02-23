import { AppInputProps } from '../../interfaces/interfaces';
import { View, Text, TextInput } from 'react-native';
import { formatCPF, formatPhone } from '../../app/utils/mask';


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
    <View className='w-90% px-17 '>
      <Text className='text-[10px] font-bold text-#fff font-interBold'>{label}</Text>
      <TextInput className='bg-[rgba(255,255,255,0.03)] w-full h-55 mb-24 text-#fff' placeholderTextColor="#475569" value={value} onChangeText={handleChange} keyboardType={getKeyboardType()} secureTextEntry={isPassword} {...rest} />

    </View>
  )
} 
