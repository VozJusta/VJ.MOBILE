import { ZodUpdatePasswordTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/services/BASE_URL";
import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodUpdatePasswordSchema } from "@/validation/schema.zod";

export async function UpdatePasswordService(data: ZodUpdatePasswordTypes) {
  try {
    const validate = ZodValidate(ZodUpdatePasswordSchema, data);

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
      body: JSON.stringify({
        email: validate.data?.email,
        new_password: validate.data?.password,
      }),
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
        fields: json.fields || [json.message],
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
