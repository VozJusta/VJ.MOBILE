import { ILawyerCompleteRegister } from "@/interfaces/services/auth/completeRegister/lawyer";
import { BASE_URL } from "@/settings/BASE_URL";
import { useXTokenStorage } from "@/store/auth/token.store";

export async function completeLawyerRegister(body: ILawyerCompleteRegister) {

  const xToken = useXTokenStorage.getState().token;

  const cleanBody = {
    ...body,
    oabNumber: body.oabNumber.replace(/\D/g, ""),
  };

  if (!xToken) {
    return {
      success: false,
      error: "Usuário não autenticado",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/complete/lawyer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-security-token": xToken,
      },
      body: JSON.stringify(cleanBody),
    });
    const data = await response.json().catch(() => {});

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
