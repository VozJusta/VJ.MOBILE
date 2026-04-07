import { BASE_URL } from "@/settings/BASE_URL";

export type LawyerSignUpPayload = {
  fullName: string;
  cpf: string;
  oabNumber: string;
  uf: string;
  specialization: string;
  email: string;
  password: string;
};

export async function SingUpLawyer(data: LawyerSignUpPayload) {
  try {
    if (!BASE_URL) {
      return {
        success: false,
        fields: ["API não configurada. Defina EXPO_PUBLIC_API_URL no ambiente."],
      };
    }

    const response = await fetch(`${BASE_URL}/lawyer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName.trim(),
        cpf: data.cpf,
        oabNumber: data.oabNumber,
        uf: data.uf,
        oabUf: data.uf,
        specialization: data.specialization,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        fields: json?.errors || [json?.message || "Erro ao cadastrar advogado"],
      };
    }

    return {
      success: true,
      data: json,
    };
  } catch {
    return {
      success: false,
      fields: ["Erro de conexão com o servidor"],
    };
  }
}
