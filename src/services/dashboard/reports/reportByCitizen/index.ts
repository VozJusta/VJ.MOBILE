import { IGetReportsResponse } from "@/interfaces/services/dashboard/citizen/reports/cards";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function reportByCitizen(page: number, pageSize: number) {
  const token = useAccessTokenStorage.getState().accessToken;

  try {
    const response = await fetch(
      `${BASE_URL}/dashboard/citizens/me/reports?page=${page}&pageSize=${pageSize}`,
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
        fields: json.message ? [json.message] : ["Erro ao buscar relatórios"],
      };
    }

    return {
      success: true,
      data: json as IGetReportsResponse,
    };
  } catch (error) {
    return {
      success: false,
      fields: ["Erro ao buscar relatórios"],
    };
  }
}
