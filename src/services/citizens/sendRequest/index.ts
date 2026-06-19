import { apiFetch } from "@/helpers/api/apiFetch";
import { ISendRequest } from "@/interfaces/services/citizen/sendRequest";
import { BASE_URL } from "@/settings/BASE_URL";

export async function sendRequest(caseId: string, lawyerId: string) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/citizen/case/${caseId}/requests/${lawyerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const json = await response.json().catch(() => ({}));

    

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro desconhecido"],
      };
    }

    return {
      success: true,
      data: json as ISendRequest,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao enviar solicitação"],
    };
  }
}
