import { apiFetch } from "@/helpers/api/apiFetch";
import { ISynthesizeAnswerRequest } from "@/interfaces/services/citizen/simulation/synthesizeAnswyer";
import { BASE_URL } from "@/settings/BASE_URL";

export async function synthesizeAudio(body: ISynthesizeAnswerRequest) {
  try {
    const response = await apiFetch(`${BASE_URL}/simulation/synthesize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.blob().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        fields: ["Erro ao sintetizar áudio"],
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao sintetizar áudio"],
    };
  }
}
