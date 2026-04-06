import { ITokenService } from "@/interfaces/services/token/token";
import { BASE_URL } from "@/services/BASE_URL";
import { Alert } from "react-native";



export async function ValidateCode(
  email: string,
  code: string,
) {

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
    const jsonResponse: ITokenService = await response.json();
    Alert.alert("Resposta do servidor", JSON.stringify(jsonResponse));

    if (!response.ok) {
      return {
        success: false,
        fields: ["Erro na validação de 2 Fatores"],
      };
    }

    return {
      success: true,
      data: jsonResponse,
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
