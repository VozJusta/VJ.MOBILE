import { apiFetch } from "@/helpers/api/apiFetch";
import { TCaseStatus } from "@/interfaces/components/CaseCard";
import { ILawyerRequest } from "@/interfaces/services/lawyer/requests";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getLawyerRequests(status?: TCaseStatus) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/lawyer/requests${status ? `?status=${status}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      data: json as ILawyerRequest[],
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar solicitações"],
    };
  }
}
