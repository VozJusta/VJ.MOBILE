import { apiFetch } from "@/helpers/api/apiFetch";
import { IConversationResponse } from "@/interfaces/services/chat";
import { IContinueConversationRequest } from "@/interfaces/services/chat/continueConversation";
import { BASE_URL } from "@/settings/BASE_URL";

export async function continueConversation(body: IContinueConversationRequest) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/report/conversation/continue`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

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
  } catch (error) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
