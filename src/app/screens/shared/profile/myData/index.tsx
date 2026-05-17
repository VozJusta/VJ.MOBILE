import ButtonUI from "@/ui/ButtonUI";
import Header from "@/components/Header";
import Skeletons from "@/components/Skeletons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProfile } from "@/hooks/profile/useProfile";
import { PlanType } from "@/interfaces/services/auth/me";
import * as DocumentPicker from "expo-document-picker";
import { useAccessTokenStorage } from "@/store/auth/token.store";

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
  const { user, authMe } = useAuth();
  const { profile, loading, saving, fetchProfile, saveProfile, saveAvatar } =
    useProfile();
  const [isHydrated, setIsHydrated] = useState(
    useAccessTokenStorage.persist.hasHydrated(),
  );

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const unsubscribe = useAccessTokenStorage.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAccessTokenStorage.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    authMe();
  }, [isHydrated]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setPhone(profile.phone);
    }
  }, [profile]);

  async function handlePickAvatar() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.[0]) return;

    const asset = result.assets[0];
    await saveAvatar(asset.uri, asset.mimeType ?? "image/jpeg");
    fetchProfile();
  }

  async function handleSave() {
    await saveProfile({ full_name: fullName, phone });
  }

  const firstName = (profile?.full_name ?? "").trim().split(" ")[0];
  const lastName = (() => {
    const parts = (profile?.full_name ?? "").trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : "";
  })();

  if (loading || !profile) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header isCitizen={true} title="MEUS DADOS" isFirstPage={false} />
        <Skeletons amountOfSkeletons={4} height={77} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isCitizen={true} title="MEUS DADOS" isFirstPage={false} />

        <View className="items-center pb-[22px]">
          <Pressable
            onPress={handlePickAvatar}
            disabled={saving}
            className="relative"
          >
            <View
              className="w-[122px] h-[122px] rounded-full border-[3px] border-[#227BF0] items-center justify-center overflow-hidden bg-[#E9EEF4]"
              style={{
                shadowColor: "#1B6EE5",
                shadowOpacity: 0.45,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 0 },
                elevation: 12,
              }}
            >
              {profile.avatar_image ? (
                <Image
                  source={{ uri: profile.avatar_image }}
                  style={{ width: 122, height: 122 }}
                  resizeMode="cover"
                />
              ) : (
                <MaterialIcons name="person" size={82} color="#4B5563" />
              )}
            </View>

            <View className="w-[36px] h-[36px] rounded-full bg-[#1560CE] border border-[#2E83F8] items-center justify-center absolute bottom-0 right-0">
              {saving ? (
                <ActivityIndicator size={16} color="#fff" />
              ) : (
                <MaterialIcons name="camera-alt" size={18} color="#FFFFFF" />
              )}
            </View>
          </Pressable>

          <Text className="mt-[12px] text-[#EAF2FF] text-[34px] font-interBold">
            {firstName} {lastName}
          </Text>

          <View className="mt-[8px] px-[12px] py-[3px] rounded-full border border-[#2D74D7]/50 bg-[rgba(23,90,187,0.3)]">
            <Text className="text-[#3F9EFF] text-[10px] uppercase tracking-[1.5px] font-interBold">
              {user?.subscription?.plan?.type === PlanType.FREE
                ? "Plano Gratuito"
                : user?.subscription?.plan?.type === PlanType.PREMIUM
                  ? "Plano Premium"
                  : user?.subscription?.plan?.type === PlanType.MEDIUM
                    ? "Plano Médio"
                    : "Sem plano"}
            </Text>
          </View>
        </View>

        <View className="gap-[16px] pb-[18px]">
          <EditableField
            label="Nome Completo"
            value={fullName}
            onChangeText={setFullName}
          />

          <ReadonlyField label="CPF" value={profile.cpf} />

          <ReadonlyField label="E-mail" value={profile.email} />

          <EditableField
            label="Telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <ButtonUI
          onPress={handleSave}
          gradient
          hover={false}
          iconLeft={false}
          paddingButtonStatus={""}
          disabled={saving}
        >
          <View className="w-full h-full items-center justify-center">
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-[17px] font-interSemiBold">
                Salvar alterações
              </Text>
            )}
          </View>
        </ButtonUI>
      </ScrollView>
    </SafeAreaView>
  );
}
