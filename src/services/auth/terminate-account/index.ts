import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function deleteAccount(password: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/auth/terminate-account`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao encerrar a conta",
      };
    }

    return {
      success: true,
      message: json.message || "Conta encerrada com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro de rede ao encerrar a conta",
    };
  }
}
