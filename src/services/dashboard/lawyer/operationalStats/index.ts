import { apiFetch } from "@/helpers/api/apiFetch";
import { IGetOperationalStatsResponse } from "@/interfaces/services/dashboard/lawyer/operationalStats";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getOperationalStatsDashboard() {
  try {
    const response = await apiFetch(
      `${BASE_URL}/dashboard/lawyer/operational-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message
          ? [json.message]
          : ["Erro ao buscar estatísticas operacionais"],
      };
    }

    return {
      success: true,
      data: json as IGetOperationalStatsResponse,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar estatísticas operacionais"],
    };
  }
}
