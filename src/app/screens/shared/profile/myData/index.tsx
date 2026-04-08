import Logo from "@/assets/svg/icons/logo.svg";
import ButtonUI from "@/ui/ButtonUI";
import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccessTokenStorage } from "@/store/token.store";
import { jwtDecode } from "jwt-decode";
import { IToken } from "@/interfaces/services/citizen/SingUp";
import { de } from "zod/v4/locales";

type EditableFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

type ReadonlyFieldProps = {
  label: string;
  value: string;
};

function EditableField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
}: EditableFieldProps) {
  return (
    <View className="w-full h-[77px] rounded-[28px] border border-[#1C4A84]/45 bg-[rgba(7,23,45,0.62)] p-[16px]">
      <Text className="text-[10px] font-interBold uppercase tracking-[2px] text-[#7E93B2]">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#7E93B2"
        className="mt-[4px] text-[16px] text-[#E5EEF9] font-interRegular"
      />
    </View>
  );
}

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <View className="w-full h-[77px] rounded-[28px] border border-[#1C4A84]/45 bg-[rgba(7,23,45,0.62)] p-[16px]">
      <Text className="text-[10px] font-interBold uppercase tracking-[2px] text-[#7E93B2]">
        {label}
      </Text>
      <Text className="mt-[4px] text-[16px] text-[#E5EEF9] font-interRegular">
        {value}
      </Text>
    </View>
  );
}

export default function MyDataScreen() {
  
  const [phone, setPhone] = useState("(11) 98765-4321");
  const token = useAccessTokenStorage((state) => state.accessToken);
  if (!token) return;
  const decodedToken = jwtDecode<IToken>(token);
  Alert.alert("Token decodificado", JSON.stringify(decodedToken));
  const fullName = decodedToken.fullName || "";
  Alert.alert(fullName);
  const firstName = fullName.trim().split(" ")[0];
  const [isFullName, setFullName] = useState(decodedToken.fullName || "");

  const getLastName = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return ""
    }
    return parts.pop() || "";
  };

  const fixedData = useMemo(
    () => ({
      cpf: "123.456.789-00",
      email: "ricardo.silva@exemplo.com",
    }),
    [],
  );

  const lastName = getLastName(fullName);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 6,
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        <View className="mb-[32px]">
          <Header isCitizen={true} title="MEUS DADOS" isFirstPage={false} />
        </View>

        <View className="items-center pb-[22px]">
          <View
            className="w-[122px] h-[122px] rounded-full border-[3px] border-[#227BF0] items-center justify-center bg-[#E9EEF4]"
            style={{
              shadowColor: "#1B6EE5",
              shadowOpacity: 0.45,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 0 },
              elevation: 12,
            }}
          >
            <MaterialIcons name="person" size={82} color="#4B5563" />
          </View>

          <Pressable className="w-[36px] h-[36px] rounded-full bg-[#1560CE] border border-[#2E83F8] items-center justify-center mt-[-24px] ml-[92px]">
            <MaterialIcons name="edit" size={18} color="#FFFFFF" />
          </Pressable>

          <Text className="mt-[12px] text-[#EAF2FF] text-[34px] font-interBold">
            {firstName} {lastName}
          </Text>

          <View className="mt-[8px] px-[12px] py-[3px] rounded-full border border-[#2D74D7]/50 bg-[rgba(23,90,187,0.3)]">
            <Text className="text-[#3F9EFF] text-[10px] uppercase tracking-[1.5px] font-interBold">
              Membro Premium
            </Text>
          </View>
        </View>

        <View className="gap-[16px] pb-[18px]">
          <EditableField
            label="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
          />

          <ReadonlyField label="CPF" value={fixedData.cpf} />

          <ReadonlyField label="E-mail" value={decodedToken.email} />

          <EditableField
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <ButtonUI
          onPress={() => {}}
          gradient
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
        >
          <View className="w-full h-full items-center justify-center">
            <Text className="text-white text-[17px] font-interSemiBold">
              Salvar alterações
            </Text>
          </View>
        </ButtonUI>
      </ScrollView>
    </SafeAreaView>
  );
}
