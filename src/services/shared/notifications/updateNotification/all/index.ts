import { apiFetch } from "@/helpers/api/apiFetch";
import { IUpdateNotificationsResponse } from "@/interfaces/services/shared/notifications/updateNotifications";
import { BASE_URL } from "@/settings/BASE_URL";

export async function updateAllNotifications() {
  try {
    const response = await apiFetch(`${BASE_URL}/notifications/read-all`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao marcar notificações como lidas",
      };
    }

    const data = await response.json().catch(() => {});

    return {
      success: true,
      data: data as IUpdateNotificationsResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao marcar notificações como lidas",
    };
  }
}
