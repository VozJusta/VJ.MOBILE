import { IContactCard } from "@/interfaces/components/ContactCard";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function ContactCard({ ...props }: IContactCard) {
  return (
    <View className="flex flex-col p-6 gap-4 bg-[#161E29]/70 border border-[#2B86EE]/20 rounded-2xl w-full h-fit">
      <View className="flex flex-row border-b border-b-[#2b86ee]/20 pb-3 gap-2">
        <MaterialIcons name="assignment-ind" size={24} color="#2b86ee" />
        <Text className="font-interBold text-[16px] text-white">
          INFORMAÇÕES DE CONTATO
        </Text>
      </View>
      <View className="flex flex-row gap-4 items-center">
        <View className="flex items-center justify-center p-3 rounded-full bg-[#283546] border border-[#2B86EE]/20">
          <Text className="font-interBold text-[14px] text-white">CO</Text>
        </View>
        <Text className="font-interBold text-[18px] text-[#FFFFFF]">
          {props.name}
        </Text>
      </View>
      <View className="flex flex-col gap-1">
        <Text className="font-interSemiBold text-[12px] text-[#64748B]">
          TELEFONE / WHATSAPP
        </Text>
        <View className="flex flex-row w-full justify-between">
          <Text className="font-inter text-[14px] text-[#FFFFFF]">
            {props.phone}
          </Text>
          <MaterialIcons name="phone" size={24} color="#2b86ee" />
        </View>
      </View>
      <View className="flex flex-col gap-1">
        <Text className="font-interSemiBold text-[12px] text-[#64748B]">
          EMAIL
        </Text>
        <View className="flex flex-row w-full justify-between">
          <Text className="font-inter text-[14px] text-[#FFFFFF]">
            {props.email}
          </Text>
          <MaterialIcons name="email" size={24} color="#2b86ee" />
        </View>
      </View>
    </View>
  );
}
