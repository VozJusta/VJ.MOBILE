import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage, useRefreshTokenStorage } from "@/store/auth/token.store";

export async function refreshToken() {
  const token = useRefreshTokenStorage.getState().refreshToken;

  if (!token) {
    throw new Error("O Refresh Token não está disponível.");
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      refreshToken: token,
    },
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
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
}