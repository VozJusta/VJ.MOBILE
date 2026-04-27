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
          Accept: "application/json",
        },
      },
    );

    const json = await response.json().catch(() => ({}));
    console.log("getLawyerRequests response:", json);

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao buscar solicitações"],
      };
    }

    return {
      success: true,
      data: json.data as ILawyerRequest[],
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar solicitações"],
    };
  }
}
