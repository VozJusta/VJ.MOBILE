import { ZodUpdatePasswordTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/services/BASE_URL";
import { useEmailStorage } from "@/store/email.store";
import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodUpdatePasswordSchema } from "@/validation/schema.zod";

export async function UpdatePassword(data: ZodUpdatePasswordTypes) {
  try {
    const email = useEmailStorage.getState().email;
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
      body: JSON.stringify({ email, password: validate.data?.password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        fields: json?.fields || [json?.message],
      };
    }

    return {
      success: true,
      data: json || "",
    };
  } catch (err: any) {
    console.log("ERRO NA REQUISIÇÃO:", err);

    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
