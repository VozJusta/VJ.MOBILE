import { BASE_URL } from "@/settings/BASE_URL";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/auth/token.store";
import { fetch } from "expo/fetch";

export async function ValidateEmail(
  email: string,
  code: string,
  token: string,
) {
  const setAccessToken = useAccessTokenStorage.getState().setTokens;
  const setRefreshToken = useRefreshTokenStorage.getState().setTokens;

  try {
    const response = await fetch(`${BASE_URL}/auth/validate/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-security-token": `${token}`,
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message
          ? [json.message]
          : ["Erro desconhecido"],
      };
    }

    if (!json.access_token || !json.refresh_token) {
      return {
        success: false,
        fields: ["Resposta do servidor inválida"],
      };
    }

    setAccessToken(json.access_token);
    setRefreshToken(json.refresh_token);

    return {
      success: true,
      data: "",
    };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
