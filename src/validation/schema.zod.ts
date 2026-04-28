import { passwordSchema } from "@/utils/validation";
import { z } from "zod";

export const ZodSignUpSchema = z.object({
  fullName: z.string(),
  email: z.email("Email inválido"),
  password: passwordSchema,
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
        return input.replace(/[.-]/g, "");
      }
      return input;
    },
    z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  ),
});

export const ZodSignUpLawyerSchema = ZodSignUpSchema.extend({
  oabNumber: z.preprocess(
    (input) => {
      if (typeof input === "string") {
        return input.replace(/[.-]/g, "");
      }
      return input;
    },
    z.string().min(1, "OAB é obrigatória"),
  ),
  oabState: z.string().min(1, "Estado da OAB é obrigatório"),
  specialization: z.string().min(1, "Especialização é obrigatória"),
});

export const ZodLoginSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const ZodUpdatePasswordSchema = z
  .object({
    email: z.email("Email inválido").min(1, "Email é obrigatório"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
