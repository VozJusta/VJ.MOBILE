import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const redirectUri = "https://auth.expo.io/@oliveiraz/vj-mobile";
  console.log("redirectUri:", redirectUri);
  const [userInfo, setUserInfo] = useState<null | Record<string, any>>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, // ← adiciona
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
    
      if (token) {
        fetchUserInfo(token);
      }
    }
  }, [response]); 

  const fetchUserInfo = async (token: string) => {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    setUserInfo(user);
    console.log("Usuário:", user);
  };

  return { request, promptAsync, userInfo };
}