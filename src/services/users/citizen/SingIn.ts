import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodLoginTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/services/BASE_URL";
import { ZodLoginSchema } from "@/validation/schema.zod";
import { useTokenStorage } from "@/store/token.store";
import { set } from "zod";

export async function SingInCitizen(data: ZodLoginTypes) {
  const setToken = useTokenStorage.getState().setToken;
  try {
    const validate = ZodValidate(ZodLoginSchema, data);

    if (!validate.success) {
      return {
        success: false,
        fields: validate.fields,
      };
    }
    console.log(validate);

    const response = await fetch(`${BASE_URL}/auth/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: validate.data?.email,
        password: validate.data?.password,
      }),
    });

    const token = response.headers.get("x-security-token");
    console.log("Token recebido:", token);
    if (token) {
      setToken(token);
    }

    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao autenticar"],
      };
    }
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
