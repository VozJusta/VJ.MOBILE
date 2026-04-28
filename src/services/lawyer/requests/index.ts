import { apiFetch } from "@/helpers/api/apiFetch";
import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { ILawyerRequest } from "@/interfaces/services/lawyer/requests";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getLawyerRequests(
  status?: TCaseStatus,
  page: number = 1,
  pageSize: number = 10,
) {
  try {
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    params.append("page", String(page));
    params.append("pageSize", String(pageSize));

    const response = await apiFetch(
      `${BASE_URL}/lawyer/requests?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao buscar solicitações"],
      };
    }

    return {
      success: true,
      data: json as ILawyerRequest,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar solicitações"],
    };
  }
}
