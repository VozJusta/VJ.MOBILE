import { ZodValidate } from "@/validation/safeValidate.zod";
import { BASE_URL } from "@/settings/BASE_URL";
import { IRegisterResponse } from "@/interfaces/services/auth/signUp";
import { ZodSignUpTypes } from "@/types/validation";
import { ZodSignUpSchema } from "@/validation/auth/SignUp";
import { useXTokenStorage } from "@/store/auth/token.store";

export async function SignUpCitizen(data: ZodSignUpTypes) {
  const setToken = useXTokenStorage.getState().setToken;
  try {
    const validate = ZodValidate(ZodSignUpSchema, data);

    if (!validate.success) {
      return {
        success: false,
        fields: validate.fields,
      };
    }

    const response = await fetch(`${BASE_URL}/citizen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullName: validate.data?.fullName.trim(),
        cpf: validate.data?.cpf,
        phone: validate.data?.phone,
        email: validate.data?.email,
        password: validate.data?.password,
      }),
    });


    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao cadastrar"],
      };
    }

    const token =
      response.headers.get("x-security-token") ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response.headers as any).map?.["x-security-token"];
    if (token) {
      setToken(token);
    }

    return {
      success: true,
      data: json as IRegisterResponse,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
