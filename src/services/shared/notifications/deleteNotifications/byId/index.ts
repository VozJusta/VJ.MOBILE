import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function deleteNotificationById(id: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao deletar essa notificação específica",
      };
    }

    return {
      success: true,
      message: "Notificação deletada com sucesso",
    };
  } catch {
    return {
      success: false,
      message: "Erro ao deletar essa notificação específica",
    };
  }
}
