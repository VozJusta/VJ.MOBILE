import { ZodUpdatePasswordTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/services/BASE_URL";
import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodUpdatePasswordSchema } from "@/validation/schema.zod";


export async function UpdatePasswordService(data: ZodUpdatePasswordTypes) {
  try {
    const validate = ZodValidate(ZodUpdatePasswordSchema, data);
    console.log("Dados validados para atualização de senha:", validate);

    if (!validate.success) {
      return {
        success: false,
        fields: validate.fields,
      };
    }
    if (validate.data?.password !== validate.data?.confirmPassword) {
      return {
        success: false,
        fields: "As senhas não coincidem",
      };
    }

    const response = await fetch(`${BASE_URL}/auth/forgot/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: validate.data?.email, new_password: validate.data?.password }),
    });
    console.log("Resposta da API de atualização de senha:", response);
    const text = await response.text();
    console.log("Resposta em texto da API de atualização de senha:", text);
    let json: any = {};
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      json = { message: text };
    }
    console.log("Resposta em JSON da API de atualização de senha:", json);
    if (!response.ok) {
      return {
        success: false,
        fields: json.fields || [json.message],
      };
    }

    return { success: true, data: json || "" };;
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
