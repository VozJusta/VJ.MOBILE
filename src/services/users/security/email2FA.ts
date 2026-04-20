import { BASE_URL } from "@/settings/BASE_URL";

export async function Email2FA(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/send/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json?.fields || [json?.message || "Erro ao enviar o código de verificação"],
      };
    }


    return {
      success: true,
      data: "Código de verificação enviado para o email",
    };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
