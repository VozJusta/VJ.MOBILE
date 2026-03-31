export function SingInCitizen() { }
import { ZodValidate } from "@/validation/safeValidate.zod";
import { ZodSingUpTypes } from "@/interfaces/validation/zodTypes";
import { BASE_URL } from "@/settings/BASE_URL";
import { ZodSingUpSchema } from "@/validation/schema.zod";
import { Alert } from "react-native";

export async function SingUpCitizen(data: ZodSingUpTypes) {
  try {
    console.log("api: ", BASE_URL);
    console.log("dados batendo na api: ", data);

    const validate = ZodValidate(ZodSingUpSchema, data);

    if (!validate.success) {
      return {
        success: false,
        fields: validate.fields,
      };
    }
    console.log(validate);

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
    console.log(response);
    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao cadastrar"],
      };
    }
    console.log("message:", response.statusText);

    console.log("response:", response);
    console.log("json:", json);

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
