import { email, string, z } from "zod";

export const ZodSingUpSchema = z.object({
  fullName: z.string(),
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(8, { message: "Senha com no mínimo 8 caracteres" })
    .refine(
      (val) => /[A-Z]/.test(val),
      "A senha deve conter pelo menos uma letra maiúscula",
    )
    .refine((val) => /\d/.test(val), "A senha deve conter pelo menos um número")
    .refine(
      (val) => /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/.test(val),
      "A senha deve conter pelo menos um caractere especial",
    ),
  phone: z.preprocess(
    (input) => {
      if (typeof input === "string") {
        return input.replace(/\D/g, "");
      }
      return input;
    },
    z.string().min(10, "Telefone inválido").max(11, "Telefone inválido"),
  ),
  cpf: z.preprocess(
    (input) => {
      if (typeof input === "string") {
        return input.replace(/[.\-]/g, "");
      }
      return input;
    },
    z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  ),
});

export const ZodLoginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string(),
});

export const ZodUpdatePasswordSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(8, { message: "Senha com no mínimo 8 caracteres" })
    .refine(
      (val) => /[A-Z]/.test(val),
      "A senha deve conter pelo menos uma letra maiúscula",
    )
    .refine((val) => /\d/.test(val), "A senha deve conter pelo menos um número")
    .refine(
      (val) => /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/.test(val),
      "A senha deve conter pelo menos um caractere especial",
    ),
  confirmPassword: z
    .string()
    .min(8, { message: "Senha com no mínimo 8 caracteres" })
    .refine(
      (val) => /[A-Z]/.test(val),
      "A senha deve conter pelo menos uma letra maiúscula",
    )
    .refine((val) => /\d/.test(val), "A senha deve conter pelo menos um número")
    .refine(
      (val) => /[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]/.test(val),
      "A senha deve conter pelo menos um caractere especial"
    )
})
