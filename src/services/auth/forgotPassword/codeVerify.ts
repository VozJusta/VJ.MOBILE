import { IValidateCodeForgotResponse } from "@/interfaces/services/token/token";
import { BASE_URL } from "@/settings/BASE_URL";

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

    const json: IValidateCodeForgotResponse = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao validar código"],
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
