import { apiFetch } from "@/helpers/api/apiFetch";
import { IGetReportDetailsResponse } from "@/interfaces/services/dashboard/citizen/reports/detailsReport";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getReportDetails(reportId: string) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/dashboard/citizens/me/reports/${reportId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {  
        success: false,
        fields: data?.message
          ? [data.message]
          : ["Erro ao obter detalhes do relatório"],
      };
    }


    return {
      success: true,
      data: data as IGetReportDetailsResponse,
    };
  } catch (error) {
    return {
      success: false,
      fields: ["Erro ao obter detalhes do relatório"],
    };
  }
}
