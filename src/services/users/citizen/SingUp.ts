import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/services/BASE_URL";
import { ZodSingUpSchema } from "@/validation/schema.zod";

export async function SingUpCitizen(data: ZodSingUpTypes) {
  try {
<<<<<<< HEAD:src/settings/users/citizen/SingUp.ts
    if (!BASE_URL) {
      return {
        success: false,
        fields: ["API não configurada. Defina EXPO_PUBLIC_API_URL no ambiente."],
      };
    }

    console.log("api: ", BASE_URL);
    console.log("dados batendo na api: ", data);

=======
>>>>>>> eb590d05b6ffb480efbb1da22e4640e1367c4ca2:src/services/users/citizen/SingUp.ts
    const validate = ZodValidate(ZodSingUpSchema, data);

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

    const json = await response.json();
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
