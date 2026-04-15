import { useAccessTokenStorage } from "@/store/token.store";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";

export function InitialRedirect() {
  const accessToken = useAccessTokenStorage((state) => state.accessToken);
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    if (accessToken) {
      router.replace("/screens/citizen/home");
    } else {
      router.replace("/screens/auth/users/signIn");
    }
  }, [accessToken, navigationState?.key]);

  return null;
}