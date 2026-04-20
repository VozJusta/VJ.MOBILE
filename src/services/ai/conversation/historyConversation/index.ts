import { IHistoryConversationResponse } from "@/interfaces/services/chat/historyConversation";
import { BASE_URL } from "@/settings/BASE_URL";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function historyConversation(conversationId: string) {
  try {
    const accessToken = useAccessTokenStorage.getState().accessToken;

    const response = await fetch(`${BASE_URL}/report/chat/${conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
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
