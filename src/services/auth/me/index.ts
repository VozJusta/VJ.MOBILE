import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getMe() {
  try {
    const response = await apiFetch(`${BASE_URL}/auth/ME`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      data: json.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro de rede ao obter os dados do usuário",
    };
  }
}
