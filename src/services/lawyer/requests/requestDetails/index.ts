import { apiFetch } from "@/helpers/api/apiFetch";
import { IRequestDetails } from "@/interfaces/services/lawyer/requests/requestDetails";
import { BASE_URL } from "@/settings/BASE_URL";

export async function requestDetails(requestId: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/lawyer/cases/${requestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const json = await response.json().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        fields: [json?.message || "Erro desconhecido"],
      };
    }

    return {
      success: true,
      data: json as IRequestDetails,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
