import { ZodValidate } from "@/validation/safeValidate.zod";
import { BASE_URL } from "@/settings/BASE_URL";
import { ZodSignUpLawyerTypes } from "@/interfaces/validation/zodTypes";
import { ZodSignUpLawyerSchema} from "@/validation/schema.zod";

export async function SignUpLawyer(data: ZodSignUpLawyerTypes) {
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
      }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao cadastrar"],
      };
    }

    return {
      success: true,
      data: json,
    };
  } catch (err: any) {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
