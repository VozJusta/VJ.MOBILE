export function SingInCitizen () {
    
}import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/settings/BASE_URL";
import { ZodSingUpSchema } from "@/validation/schema.zod";

export async function SingUpCitizen(data: ZodSingUpTypes) {
  const validate = ZodValidate(ZodSingUpSchema, data);
  if (validate.success !== true) {
    return {
      success: false,
      fields: validate.fields,
    };
  }

  const response = await fetch(`${BASE_URL}/citizen`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: validate.data?.fullName,
      cpf: validate.data?.cpf,
      phone: validate.data?.phone,
      email: validate.data?.email,
      password: validate.data?.password,
    }),
  });

  return {
    success: true,
    data: response.json,
  };
}
