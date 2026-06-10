import { ICitizenCompleteRegister } from "@/interfaces/services/auth/completeRegister/citizen";
import { BASE_URL } from "@/settings/BASE_URL";
import { useXTokenStorage } from "@/store/auth/token.store";

export async function completeCitizenRegister(body: ICitizenCompleteRegister) {
  console.log("Iniciando completeCitizenRegister com os seguintes dados:", body);
  const xToken = useXTokenStorage.getState().token;
  console.log("xToken:", xToken);

  if (!xToken) {
    return {
      success: false,
      error: "Usuário não autenticado",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/complete/citizen`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-security-token": xToken,
      },
      body: JSON.stringify(body),
    });
    console.log("Status:", response.status);
    console.log("Response OK:", response.ok);
    const data = await response.json().catch(() => {});
    console.log("Status:", response.status);
    console.log("Resposta do servidor:", JSON.stringify(data));

    if (!response.ok) {
      return {
        success: false,
        data: data.message || "Erro ao completar cadastro",
      };
    }

    return {
      success: true,
      data: data.message || "Cadastro completo com sucesso",
    };
  } catch {
    return {
      success: false,
      error: "Erro de rede ao completar cadastro",
    };
  }
}
