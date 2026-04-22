import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Logo from "@/assets/svg/icons/logo.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccessTokenStorage } from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "@/helpers/store";
import { IDecodedToken } from "@/interfaces/shared/decodedToken";

export default function App() {
  const accessToken: string | null = useAccessTokenStorage(
    (state) => state.accessToken,
  );
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const decodedToken = useMemo(() => {
    if (!accessToken) {
      return null;
    }
    try {
      return jwtDecode<IDecodedToken>(accessToken);
    } catch (error) {
      return null;
    }
  }, []);

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.7,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(scale, {
        toValue: 2.7,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(1500),
    ]);

    anim.start(() => {
      if (
        accessToken &&
        decodedToken &&
        !isTokenExpired(decodedToken) &&
        decodedToken.role.toLowerCase() === "citizen"
      ) {
        router.replace("/screens/citizen/home");
      } else if (
        accessToken &&
        decodedToken &&
        !isTokenExpired(decodedToken) &&
        decodedToken.role.toLowerCase() === "lawyer"
      ) {
        router.replace("/screens/lawyer/home");
      } else {
        router.replace("/screens/Onboarding");
      }
    });

    return () => anim.stop();
  }, [accessToken, decodedToken]);

  return (
    <>
      <StatusBar hidden />
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        colors={["#000000", "#052F5F"]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View
            style={{ transform: [{ scale }], flex: 1 }}
            className="flex-1 items-center justify-center"
          >
            <View className="flex justify-center items-center w-[812px] h-[804px] rounded-full bg-black800">
              <Logo width={70} height={51} />
            </View>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
