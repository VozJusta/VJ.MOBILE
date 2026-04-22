import { BASE_URL } from "@/settings/BASE_URL";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import Toast from "react-native-toast-message";

export async function refreshToken() {
  const refreshToken = useRefreshTokenStorage.getState().refreshToken;

  if (!refreshToken) {
    Toast.show({
      type: "error",
      text1: "Refresh Token não encontrado",
      text2: "Por favor, faça login novamente.",
    });
    throw new Error("O Refresh Token não está disponível.");
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        refreshToken: refreshToken,
      },
    });

    const json = await response.json().catch(() => {});

    if (!response.ok) {
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar token",
        text2: "Por favor, faça login novamente.",
      });
      throw new Error("Falha ao atualizar o token.");
    }

    const newAccessToken = json.access_token;

    if (newAccessToken) {
      useAccessTokenStorage.getState().setTokens(newAccessToken);
    }

    return {
      success: true,
      accessToken: newAccessToken,
    };
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erro ao atualizar token",
      text2: "Por favor, faça login novamente.",
    });
    return {
      success: false,
      accessToken: null,
    };
  }
}
