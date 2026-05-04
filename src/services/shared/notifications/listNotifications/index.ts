import { apiFetch } from "@/helpers/api/apiFetch";
import { INotificationsResponse } from "@/interfaces/services/shared/notifications";
import { BASE_URL } from "@/settings/BASE_URL";

export async function listNotifications() {
  try {
    const response = await apiFetch(`${BASE_URL}/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao listar notificações",
      };
    }

    const data = await response.json().catch(() => {});

    return {
      success: true,
      data: data as INotificationsResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao listar notificações",
    };
  }
}
