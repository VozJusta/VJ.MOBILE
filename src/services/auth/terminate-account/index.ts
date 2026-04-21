import { apiFetch } from "@/helpers/api/apiFetch";
import { useAccessTokenStorage } from "@/store/auth/token.store";

export async function deleteAccount(password: string) {
  const token = await useAccessTokenStorage.getState().accessToken;

  try {
    const response = await apiFetch("/auth/terminate-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Erro ao encerrar a conta",
      };
    }

    return {
      success: true,
      message: json.message || "Conta encerrada com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro de rede ao encerrar a conta",
    };
  }
}
