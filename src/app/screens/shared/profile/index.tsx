import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/assets/svg/icons/logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonsProfile } from "@/utils/profile/data";
import ProfileButton from "@/components/ProfileButton";
import { IDecodedToken } from "@/interfaces/services/token/token";
import { jwtDecode } from "jwt-decode";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProfileCitizen() {
  const token = useAccessTokenStorage((state) => state.accessToken);
  const router = useRouter();
  const { handleLogout } = useAuth();
  let decodedToken: IDecodedToken | null = null;
  if (token) {
    try {
      decodedToken = jwtDecode<IDecodedToken>(token);
    } catch {
      decodedToken = null;
    }
  }

  useEffect(() => {
    if (!token) {
      router.replace("/screens/Onboarding/roles");
    }
  }, [token]);

  if (!token) return null;
  const sections = [[0, 1], [2, 3], [4]];
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} className="gap-[32px]">
        <Header isFirstPage={true} title="PERFIL" isCitizen={true} />
        <View className="w-full justify-center items-center gap-[16px]">
          <LinearGradient
            style={{
              width: 112,
              height: 112,
              borderRadius: 100,
              position: "relative",
              zIndex: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#1D4ED8", "#60A5FA"]}
          >
            <View className=" rounded-full min-w-[104px] min-h-[104px] border-[4px] border-solid border-[#0F172A] bg-[#1E293B] justify-center items-center">
              <MaterialIcons name="person" size={48} color={"#8E8E93"} />
            </View>
          </LinearGradient>
          <View className="flex-col justify-center items-center">
            <Text className="font-inter text-[20px] text-[#F1F5F9]">
              {decodedToken?.fullName ?? ""}
            </Text>
            <View className="px-[12px] py-[2px] bg-[rgba(25,120,229,0.2)] rounded-full border border-solid border-[rgba(25,120,229,0.3)]">
              <Text className="font-interBold text-[10px] uppercase text-[#1978E5]">
                Membro Premium
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-col gap-[16px] w-full pb-20">
          {sections.map((group, index) => (
            <View
              key={index}
              className="flex-col gap-[16px] p-[16px] bg-[rgba(30,40,59,0.4)] rounded-[16] border border-solid border-white/5 justify-center items-center"
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
      </SafeAreaView>
    </ScrollView>
  );
}
