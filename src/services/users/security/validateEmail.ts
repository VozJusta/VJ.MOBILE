import { ITokenService } from "@/interfaces/services/token/token";
import { BASE_URL } from "@/services/BASE_URL";
import {
  useAccessTokenStorage,
  useRefreshTokenStorage,
} from "@/store/token.store";
import { Alert } from "react-native";
import { set } from "zod";

export async function ValidateEmail(
  email: string,
  code: string,
  token: string,
) {
  console.log("🔥 ENTROU NO ValidateEmail");
  const setAccessToken = useAccessTokenStorage.getState().setTokens;
  const setRefreshToken = useRefreshTokenStorage.getState().setTokens;

  try {
    const response = await fetch(`${BASE_URL}/auth/validate/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-security-token": token,
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
    const jsonResponse: ITokenService = await response.json();
    setAccessToken(jsonResponse.access_token || "");
    setRefreshToken(jsonResponse.refresh_token || "");

    if (!response.ok) {
      return {
        success: false,
        fields: ["Erro na validação de 2 Fatores"],
      };
    }

    return {
      success: true,
      data: "",
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
