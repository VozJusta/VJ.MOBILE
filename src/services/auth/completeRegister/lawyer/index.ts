import { ILawyerCompleteRegister } from "@/interfaces/services/auth/completeRegister/lawyer";
import { BASE_URL } from "@/settings/BASE_URL";
import { useXTokenStorage } from "@/store/auth/token.store";
import { jwtDecode } from "jwt-decode";

export async function completeLawyerRegister(body: ILawyerCompleteRegister) {
  console.log("Iniciando completeLawyerRegister com os seguintes dados:", body);
  const xToken = useXTokenStorage.getState().token;
  console.log("token decodificado:", JSON.stringify(jwtDecode(xToken || "")));
  console.log("xToken:", xToken);
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
    console.log("Status:", response.status);
    console.log("Response OK:", response.ok);
    const data = await response.json().catch(() => {});
    console.log(data);

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
