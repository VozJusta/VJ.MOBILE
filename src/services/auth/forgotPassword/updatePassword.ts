import { BASE_URL } from "@/settings/BASE_URL";
import { ZodUpdatePasswordTypes } from "@/types/validation";
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
        fields: ["As senhas não coincidem"],
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

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json.message ? [json.message] : ["Erro ao atualizar a senha"],
      };
    }

    return { success: true, data: json || "" };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
