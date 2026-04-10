import { ITokenService } from "@/interfaces/services/token/token";
import { BASE_URL } from "@/services/BASE_URL";
import { Alert } from "react-native";

export async function ValidateCode(email: string, code: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    });
    const json: ITokenService = await response.json();

    if (!response.ok) {
      return {
        success: false,
        fields: json.message,
      };
    }

    return {
      success: true,
      data: json,
    };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
