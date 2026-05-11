import { apiFetch } from "@/helpers/api/apiFetch";
import { IProfileResponse } from "@/interfaces/services/profile";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getProfile() {
  try {
    const response = await apiFetch(`${BASE_URL}/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao obter perfil",
      };
    }

    return {
      success: true,
      data: json as IProfileResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro de conexão com o servidor",
    };
  }
}
