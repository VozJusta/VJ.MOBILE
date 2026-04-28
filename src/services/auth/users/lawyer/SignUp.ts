import { ZodValidate } from "@/validation/safeValidate.zod";
import { BASE_URL } from "@/settings/BASE_URL";
import { useXTokenStorage } from "@/store/auth/token.store";
import { IRegisterResponse } from "@/interfaces/services/auth/signUp";
import { ZodSignUpLawyerTypes } from "@/types/validation";
import { ZodSignUpLawyerSchema } from "@/validation/auth/SignUp";

export async function SignUpLawyer(data: ZodSignUpLawyerTypes) {
  const setToken = useXTokenStorage.getState().setToken;

  try {
    const validate = ZodValidate(ZodSignUpLawyerSchema, data);

    if (!validate.success) {
      return {
        success: false,
        fields: validate.fields,
      };
    }

    const response = await fetch(`${BASE_URL}/lawyer`, {
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
        oabNumber: validate.data?.oabNumber,
        oabState: validate.data?.oabState,
        specialization: validate.data?.specialization,
        billingType: "Monthly",
        namePlan: "Plano Adv Premium",
      }),
    });

    const token =
      response.headers.get("x-security-token") ||
      (response.headers as any).map?.["x-security-token"];

    if (token) {
      setToken(token);
    }

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao cadastrar"],
      };
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
