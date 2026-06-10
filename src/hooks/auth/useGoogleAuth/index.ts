import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Role } from "@/types/roles/roles";
import { BASE_URL } from "@/settings/BASE_URL";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/interfaces/shared/decodedToken";

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const loginWithGoogle = async (role: Role) => {
    setLoading(true);

    try {
      const redirectUrl =
        Linking.createURL("/", { scheme: "vozjusta" }).replace("///", "//") +
        "auth";

      console.log("Redirect URL:", redirectUrl);
      const state = `${role}|mobile`;
      const authUrl = `${BASE_URL}/auth/google?state=${encodeURIComponent(state)}`;
      console.log("state enviado:", state);
      console.log("authUrl:", authUrl);

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl,
      );
      console.log("result type:", result.type);
      if (result.type === "success") {
        console.log("URL retornada:", result.url);
      }

      if (result.type !== "success") {
        return {
          success: false,
          error: "Login cancelado pelo usuário.",
        };
      }

      const url = new URL(result.url);

      console.log("URL completa:", result.url);
      console.log(
        "registerCompleted param:",
        url.searchParams.get("registerCompleted"),
      );

      const token = url.searchParams.get("x-security-token");

      const registerCompleted =
        url.searchParams.get("registerCompleted") === "true";

      if (!token) {
        return {
          success: false,
          error: "Token de autenticação não encontrado.",
        };
      }
      const email = jwtDecode<IDecodedToken>(token).email;

      return {
        success: true,
        token,
        registerCompleted,
        email,
      };
    } catch {
      return {
        success: false,
        error: "Ocorreu um erro durante o login com Google.",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loginWithGoogle,
    loading,
  };
}
