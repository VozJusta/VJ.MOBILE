import { apiFetch } from "@/helpers/api/apiFetch";
import { ICreateEvidenceRequest, ICreateEvidenceResponse } from "@/interfaces/services/citizen/createEvidences";
import { BASE_URL } from "@/settings/BASE_URL";

export async function createEvidences({ file }:ICreateEvidenceRequest) {
    try {

        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
        } as any);

        const response = await apiFetch(`${BASE_URL}/citizen/me/evidence`, {
          method: "POST",
          body: formData,
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