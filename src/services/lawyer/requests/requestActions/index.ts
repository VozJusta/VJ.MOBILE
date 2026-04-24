import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function patchRequest(
  requestId: string,
  action: "accept" | "reject",
) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/lawyer/requests/${requestId}/${action}`,
      {
        method: "PATCH",
      },
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Ocorreu um erro ao processar a solicitação.",
      };
    }

    return {
      success: true,
      message: `Solicitação ${action === "accept" ? "aceita" : "rejeitada"} com sucesso!`,
    };
  } catch {
    return {
      success: false,
      message: "Ocorreu um erro ao processar a solicitação.",
    };
  }
}
