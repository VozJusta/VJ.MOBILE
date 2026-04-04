import { BASE_URL } from "@/services/BASE_URL";
import { Alert } from "react-native";

export async function ValidateEmail(
  email: string,
  code: string,
  token: string,
) {
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

    if (!response.ok) {
      return {
        success: false,
        fields: ["Erro na validação de 2 Fatores"],
      };
    }

    const json = await response.json();
    console.log("JSON da validação de email:", json.access_token);
    console.log("Resposta da validação de email (raw):", response);

    return {
      success: true,
      data: json,
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
