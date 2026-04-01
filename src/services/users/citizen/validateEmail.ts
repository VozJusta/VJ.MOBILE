import { BASE_URL } from "@/services/BASE_URL";

export async function ValidateEmail(email: string, code: string) {
    try {

        const response = await fetch(`${BASE_URL}/auth/validate/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: code,
            }),
        });


        if (!response.ok) {
            return {
                success: false,
                fields: ["Erro na validação de 2 Fatores"],
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
