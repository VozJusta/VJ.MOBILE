import { useXTokenStorage } from "@/store/auth/token.store";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function AuthCallback() {
  const params = useLocalSearchParams();
  const { setToken } = useXTokenStorage();

  useEffect(() => {
    const token = params["x-security-token"] as string;
    const registerCompleted = params["registerCompleted"] === "true";

    if (!token) {
      router.replace("/screens/auth/Login");
      return;
    }
  }, []);

  return null;
}
