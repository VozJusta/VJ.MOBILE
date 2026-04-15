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

    const text = await response.text();

    let json: any = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { message: text };
    }

    if (!response.ok) {
      return {
        success: false,
        fields: json?.fields || [json?.message],
      };
    }


    return { success: true, data: json || "" };

  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }

}