import { Slot } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { refreshToken } from "@/services/auth/users/security/refreshToken";
import {
  useRefreshTokenStorage,
  useAccessTokenStorage,
} from "@/store/auth/token.store";
import { useEffect } from "react";

export default function LawyerLayout() {
  const refreshTokenStorage = useRefreshTokenStorage(
    (state) => state.refreshToken,
  );
  const accessTokenStorage = useAccessTokenStorage().setTokens;

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const response = await refreshToken(
          refreshTokenStorage ? refreshTokenStorage : "",
        );
        if (response.success) {
          accessTokenStorage(response.accessToken || null);
        }
      },
      3 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [refreshTokenStorage]);
  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 84, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      <Navbar profile={false} isLawyer={true} />
    </LinearGradient>
  );
}
