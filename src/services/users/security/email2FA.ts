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

    console.log("Resposta do servidor para envio de código 2FA:", json);

    return {
      success: true,
      data: json,
    };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
