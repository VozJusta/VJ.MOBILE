import { apiFetch } from "@/helpers/api/apiFetch";
import { ILawyerSelected } from "@/interfaces/services/citizen/lawyerSelected";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getLawyerSelected(lawyerId: string) {
  try {
    const response = await apiFetch(`${BASE_URL}/lawyers/${lawyerId}`, {
      method: "GET",
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message
          ? [json.message]
          : ["Erro ao buscar advogado selecionado"],
      };
    }

    return {
      success: true,
      data: json as ILawyerSelected,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar advogado selecionado"],
    };
  }
}
