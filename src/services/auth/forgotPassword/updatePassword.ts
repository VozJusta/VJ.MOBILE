import { BASE_URL } from "@/services/BASE_URL";
import { Alert } from "react-native";

export async function UpdatePassword(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/send/forgot/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        fields: json?.fields || [json?.message],
      };
    }

    return {
      success: true,
      data: json || "",
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
