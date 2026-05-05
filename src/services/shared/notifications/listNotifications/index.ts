import { apiFetch } from "@/helpers/api/apiFetch";
import { INotificationsResponse } from "@/interfaces/services/shared/notifications/listAllNotifications";
import { BASE_URL } from "@/settings/BASE_URL";

export async function listNotifications(page: number = 1, pageSize: number = 10) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/notifications?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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