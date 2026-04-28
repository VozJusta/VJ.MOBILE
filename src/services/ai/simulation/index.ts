import { apiFetch } from "@/helpers/api/apiFetch";
import {
  ISimulationResponse,
  Personality,
} from "@/interfaces/services/citizen/simulation";
import { BASE_URL } from "@/settings/BASE_URL";
import Toast from "react-native-toast-message";

export async function startSimulation(personality: Personality) {
  try {
    const response = await apiFetch(`${BASE_URL}/simulation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ personality }),
    });

    const data = await response.json().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        fields: data?.message[0] || ["Erro ao iniciar simulação"],
      };
    }

    return {
      success: true,
      data: data as ISimulationResponse,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro ao iniciar simulação. Tente novamente mais tarde."],
    };
  }
}
