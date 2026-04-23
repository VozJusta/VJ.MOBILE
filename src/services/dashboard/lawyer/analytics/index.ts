import { apiFetch } from "@/helpers/api/apiFetch";
import { IGetAnalyticsResponse } from "@/interfaces/services/dashboard/lawyer/analytics";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getAnalyticsDashboardLawyer() {
  try {
    const response = await apiFetch(`${BASE_URL}/dashboard/lawyer/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao buscar analytics"],
      };
    }

    return {
      success: true,
      data: json as IGetAnalyticsResponse,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar analytics"],
    };
  }
}
