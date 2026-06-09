import { apiFetch } from "@/helpers/api/apiFetch";
import {
  IUpdateProfileBody,
  IUpdateProfileResponse,
} from "@/interfaces/services/profile";
import { BASE_URL } from "@/settings/BASE_URL";
import { useRolesStorage } from "@/store/auth/roles.store";

export async function updateProfile(body: IUpdateProfileBody) {
  const role = useRolesStorage.getState().role;
  const data =
    role === "citizen" ? { fullName: body.fullName, phone: body.phone } : body;
  try {

    const response = await apiFetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
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
