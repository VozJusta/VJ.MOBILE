import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonsProfile } from "@/utils/profile/data";
import ProfileButton from "@/components/ProfileButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useProfile } from "@/hooks/profile/useProfile";
import { PlanType } from "@/interfaces/services/auth/me";
import Skeletons from "@/components/Skeletons";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import Header from "@/components/Header";

export default function ProfileCitizen() {
  const token = useAccessTokenStorage((state) => state.accessToken);
  const router = useRouter();
  const { handleLogout, user, loading: loadingAuth, authMe } = useAuth();
  const { profile, saving, saveAvatar, fetchProfile } = useProfile();
  const [isHydrated, setIsHydrated] = useState(
    useAccessTokenStorage.persist.hasHydrated(),
  );

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

    if (!token) {
      router.replace("/screens/Onboarding/roles");
      return;
    }

    authMe();
  }, [isHydrated, token]);

  if (!isHydrated || !token) return null;

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

  const sections = [[0, 1], [2, 3], [4]];

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flex: 1 }} className="gap-[32px]">
        <Header isCitizen={true} title="PERFIL" isFirstPage={false} />
        {loadingAuth || !user ? (
          <Skeletons amountOfSkeletons={3} height={250} />
        ) : (
          <>
            <View className="w-full justify-center items-center gap-[16px] pt-[16px]">
              <View className="relative">
                <LinearGradient
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#1D4ED8", "#60A5FA"]}
                >
                  <View className="rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] overflow-hidden justify-center items-center bg-[#1E293B]">
                    {profile?.avatar_image ? (
                      <Image
                        source={{ uri: profile.avatar_image }}
                        style={{ width: 104, height: 104 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <MaterialIcons
                        name="person"
                        size={48}
                        color={"#8E8E93"}
                      />
                    )}
                  </View>
                </LinearGradient>

                <Pressable
                  onPress={handlePickAvatar}
                  disabled={saving}
                  className="absolute bottom-0 right-0 w-[32px] h-[32px] rounded-full bg-[#1560CE] border border-[#2E83F8] items-center justify-center"
                  style={{ elevation: 4 }}
                >
                  {saving ? (
                    <ActivityIndicator size={14} color="#fff" />
                  ) : (
                    <MaterialIcons
                      name="camera-alt"
                      size={16}
                      color="#FFFFFF"
                    />
                  )}
                </Pressable>
              </View>

              <View className="flex-col justify-center items-center">
                <Text className="font-inter text-[20px] text-[#F1F5F9]">
                  {user?.full_name}
                </Text>
                <View className="px-[12px] py-[2px] bg-[rgba(25,120,229,0.2)] rounded-full border border-solid border-[rgba(25,120,229,0.3)] mt-1">
                  <Text className="font-interBold text-[10px] uppercase text-[#1978E5]">
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
            </View>

            <View className="flex-col gap-[16px] w-full pb-20">
              {sections.map((group, index) => (
                <View
                  key={index}
                  className="flex-col gap-[16px] p-[16px] bg-[rgba(30,40,59,0.4)] rounded-[16px] border border-solid border-white/5 justify-center items-center"
                >
                  {group.map((itemIndex, i) => {
                    const item = ButtonsProfile[itemIndex];
                    return (
                      <View key={itemIndex} className="w-full">
                        <ProfileButton
                          icon={item.icon}
                          colorIcon={item.colorIcon}
                          bgIcon={item.bgIcon}
                          namebutton={item.namebutton}
                          NextButton={item.NextButton}
                          path={item.path}
                          onLogout={handleLogout}
                        />

                        {i < group.length - 1 && (
                          <View className="bg-[rgba(255,255,255,0.03)] mt-[4px] w-full h-[1px]" />
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
