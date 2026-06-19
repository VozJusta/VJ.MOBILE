import { apiFetch } from "@/helpers/api/apiFetch";
import { ILawyersList } from "@/interfaces/services/citizen/lawyersList";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getLawyersList(page: number, pageSize: number) {
  try {
    const response = await apiFetch(
      `${BASE_URL}/citizen/lawyers?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
      },
    );

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao buscar advogados"],
      };
    }

    return {
      success: true,
      data: json as ILawyersList,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao buscar advogados"],
    };
  }
}
