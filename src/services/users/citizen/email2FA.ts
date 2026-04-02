import { BASE_URL } from "@/services/BASE_URL";

export async function Email2FA(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/send/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const text = await response.text();
    console.log("RAW 2FA:", text);

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = {};
    }
console.log("JSON 2FA:", json);

    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || text],
      };
    }
    const message = await response.text();

    return {
      success: true,
      data: message,
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
