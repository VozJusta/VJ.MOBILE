import { BASE_URL } from "@/settings/BASE_URL";

export async function CodeSeding(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/send/forgot/email`, {
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
        fields: json.errors || [json.message] || [
            "Erro ao enviar o código de recuperação",
          ],
      };
    }

    return { success: true, data: json };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
