import { apiFetch } from "@/helpers/api/apiFetch";
import { IHistoryConversationResponse } from "@/interfaces/services/chat/historyConversation";
import { BASE_URL } from "@/settings/BASE_URL";

export async function historyConversation(conversationId: string) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/report/chat/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

    const data: IHistoryConversationResponse = await response.json();

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
