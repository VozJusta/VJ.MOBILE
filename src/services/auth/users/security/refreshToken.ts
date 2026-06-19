import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function refreshToken(refreshToken: string) {
  if (!refreshToken) {
    throw new Error("O Refresh Token não está disponível.");
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
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
