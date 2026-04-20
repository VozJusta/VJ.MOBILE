import { IReportDetails } from "@/interfaces/services/dashboard/reports/detailsReport";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function getReportDetails(reportId: string) {
    const token = useAccessTokenStorage.getState().accessToken;

    try {
        const response = await fetch(`${BASE_URL}/dashboard/citizens/me/reports/${reportId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                fields: data?.message ? [data.message] : ["Erro ao obter detalhes do relatório"],
            }
        }

        return {
            success: true,
            data: data as IReportDetails,
        }
    } catch (error) {
        return {
            success: false,
            fields: ["Erro ao obter detalhes do relatório"],
        }
    }
}