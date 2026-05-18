import { apiFetch } from "@/helpers/api/apiFetch";
import {
  IUpdateProfileBody,
  IUpdateProfileResponse,
} from "@/interfaces/services/profile";
import { BASE_URL } from "@/settings/BASE_URL";

export async function updateProfile(body: IUpdateProfileBody) {
  try {
    const response = await apiFetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao atualizar perfil",
      };
    }

    return {
      success: true,
      data: json as IUpdateProfileResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro de conexão com o servidor",
    };
  }
}
