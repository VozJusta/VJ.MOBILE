import { apiFetch } from "@/helpers/api/apiFetch";
import {
  IContinueSimulationRequest,
  IContinueSimulationResponse,
} from "@/interfaces/services/citizen/simulation/continueSimulation";
import { BASE_URL } from "@/settings/BASE_URL";

export async function continueSimulation(body: IContinueSimulationRequest) {
  try {
    const response = await apiFetch(`${BASE_URL}/simulation/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        fields: data?.message || ["Erro ao continuar simulação"],
      };
    }

    return {
      success: true,
      data: data as IContinueSimulationResponse,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao continuar simulação"],
    };
  }
}
