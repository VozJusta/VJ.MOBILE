import { apiFetch } from "@/helpers/api/apiFetch";
import { IMeResponse } from "@/interfaces/services/auth/me";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getMe() {
  try {
    const response = await apiFetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "accept": "application/json",
      },
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao obter os dados do usuário",
      };
    }

    return {
      success: true,
      data: json as IMeResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro de rede ao obter os dados do usuário",
    };
  }
}
