import { IGetOperationalStatsResponse } from "@/interfaces/services/dashboard/lawyer/operationalStas";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function getOperationalStatsDashboard() {
  const token = useAccessTokenStorage.getState().accessToken;

  try {
    const response = await fetch(
      `${BASE_URL}/dashboard/lawyer/operational-status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  } catch (error) {
    return {
      success: false,
      fields: ["Erro ao buscar estatísticas operacionais"],
    };
  }
}
