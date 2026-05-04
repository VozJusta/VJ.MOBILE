import { apiFetch } from "@/helpers/api/apiFetch";
import { IUpdateNotificationsResponse } from "@/interfaces/services/shared/notifications/updateNotifications";
import { BASE_URL } from "@/settings/BASE_URL";

export async function updateNotificationById(id: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao marcar essa notificação específica como lida",
      };
    }

    return {
      success: true,
      data: data as IUpdateNotificationsResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao marcar essa notificação específica como lida",
    };
  }
}
