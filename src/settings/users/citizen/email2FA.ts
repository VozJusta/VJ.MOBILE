import { BASE_URL } from "@env";

export async function Email2FA(email: string) {
  try {
    console.log("api: ", BASE_URL);
    console.log("dados batendo na api: ", email);

    const response = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    console.log(response);
    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro na validação de 2 Fatores"],
      };
    }
    console.log("message:", response.statusText);

    console.log("response:", response);
    console.log("json:", json);

    return {
      success: true,
      data: json,
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
