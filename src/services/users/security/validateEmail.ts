import { ITokenService } from "@/interfaces/services/token/token";
import { BASE_URL } from "@/services/BASE_URL";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/token.store";
import { fetch } from "expo/fetch"
import { Alert } from "react-native";


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
        "x-security-token":`${token}`,
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
    const text = await response.text();

    const jsonResponse: ITokenService = JSON.parse(text);
    setAccessToken(jsonResponse.access_token || "");
    setRefreshToken(jsonResponse.refresh_token || "");
    
    if (!response.ok) {
      return {
        success: false,
        fields: jsonResponse.message || "Erro desconhecido",
      };
    }

    return {
      success: true,
      data: "",
    };
  } catch (err: any) {
    return {
      success: false,
      fields: "Erro de conexão com o servidor",
    };
  }
}
