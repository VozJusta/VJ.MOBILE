import { apiFetch } from "@/helpers/api/apiFetch";
import { IDeleteNotificationsResponse } from "@/interfaces/services/shared/notifications/deleteNotifications";
import { BASE_URL } from "@/settings/BASE_URL";

export async function deleteAllNotifications() {
  try {
    const response = await apiFetch(`${BASE_URL}/notifications`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao deletar notificações",
      };
    }

    const data = await response.json().catch(() => {});

    return {
      success: true,
      data: data as IDeleteNotificationsResponse,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao deletar todas notificações",
    };
  }
}
