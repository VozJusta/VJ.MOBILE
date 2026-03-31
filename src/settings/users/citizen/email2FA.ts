import { BASE_URL } from "@/settings/BASE_URL";

export async function Email2FA(email: string) {
  try {
    console.log("api: ", BASE_URL);
    console.log("dados batendo na api: ", email);

    const response = await fetch(`${BASE_URL}/auth/send/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });


    console.log("response:", response.json());
    if (!response.ok) {
      return {
        success: false,
        fields: ["Erro na validação de 2 Fatores"],
      };
    }
    console.log("message:", response.statusText);

    return {
      success: true,
      data: response.text(),
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
