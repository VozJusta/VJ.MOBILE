import { BASE_URL } from "@/services/BASE_URL";

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

    const text = await response.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (!response.ok) {
      return {
        success: false,
        fields: json?.fields || [json?.message || text],
      };
    }

    return {
      success: true,
      data: json || text,
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
