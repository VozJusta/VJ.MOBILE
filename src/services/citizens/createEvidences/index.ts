import { apiFetch } from "@/helpers/api/apiFetch";
import { ICreateEvidenceRequest, ICreateEvidenceResponse } from "@/interfaces/services/citizen/createEvidences";
import { ILawyerSelected } from "@/interfaces/services/citizen/lawyerSelected";
import { BASE_URL } from "@/settings/BASE_URL";

export async function createEvidences({ file }:ICreateEvidenceRequest) {
    try {
        const response = await apiFetch(`${BASE_URL}/citizen/me/evidence`, {
          method: "POST",
          body: JSON.stringify({ file }),
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
          data: json as ICreateEvidenceResponse,
        };
      } catch {
        return {
          success: false,
          fields: ["Erro ao buscar advogado selecionado"],
        };
      }
}