import { Slot, usePathname } from "expo-router";
import Navbar from "@/components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/interfaces/shared/decodedToken";
import { refreshToken } from "@/services/auth/users/security/refreshToken";
import { useEffect } from "react";

export default function SharedLayout() {
  const pathName = usePathname();
  const hiddenRoutes = [
    "/screens/shared/profile/myData",
    "/screens/shared/profile/help",
    "/screens/shared/profile/settings",
    "/screens/shared/profile/privacity",
    "/screens/shared/terms",
    "/screens/shared/terminate-account",
  ];

  const shouldHideNavbar = hiddenRoutes.includes(pathName);
  const currentRouter= pathName === "/screens/shared/terms"? 20: 84

  const token = useAccessTokenStorage((state) => state.accessToken);

  let decodedToken: IDecodedToken | null = null;
  if (token) {
    try {
      decodedToken = jwtDecode<IDecodedToken>(token);
    } catch {
      decodedToken = null;
    }
  }
  const isCitizen = decodedToken?.role?.toLowerCase() === "citizen";

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
      style={{ flex: 1, paddingBottom: currentRouter, paddingTop: 32, paddingInline: 16 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={["#000000", "#052F5F"]}
    >
      <Slot />
      {!shouldHideNavbar && <Navbar isLawyer={!isCitizen} profile={true} />}
    </LinearGradient>
  );
}
