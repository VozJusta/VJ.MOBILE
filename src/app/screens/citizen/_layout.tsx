import { Slot, usePathname } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import { refreshToken } from "@/services/auth/users/security/refreshToken";

export default function CitizenLayout() {
  const pathName = usePathname();
  const navbarRoutes = [
    "/screens/citizen/chat",
    "/screens/citizen/home",
    "/screens/citizen/simulation",
  ];
  
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
      style={{ flex: 1, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      {navbarRoutes.includes(pathName) && (
        <Navbar isLawyer={false} profile={true} />
      )}
    </LinearGradient>
  );
}
