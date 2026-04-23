import { apiFetch } from "@/helpers/api/apiFetch";
import { IConversationResponse } from "@/interfaces/services/chat";
import { IStartConversationRequest } from "@/interfaces/services/chat/startConversation";
import { BASE_URL } from "@/settings/BASE_URL";

export async function startConversation(body: IStartConversationRequest) {
  try {
    const response = await apiFetch(`${BASE_URL}/report/conversation/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => {});

      return {
        success: false,
        fields: errorData?.fields || [
          errorData?.message || "Erro desconhecido",
        ],
      };
    }

    const data: IConversationResponse = await response.json();

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
