import {
  cpfSchema,
  oabNumberSchema,
  passwordSchema,
  phoneSchema,
} from "@/utils/validation";
import { z } from "zod";

export const ZodSignUpSchema = z.object({
  fullName: z.string(),
  email: z.email("Email inválido"),
  password: passwordSchema,
  phone: phoneSchema,
  cpf: cpfSchema,
});

export const ZodSignUpLawyerSchema = ZodSignUpSchema.extend({
  oabNumber: oabNumberSchema,
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

export const ZodCompleteRegisterSharedSchema = z.object({
  cpf: cpfSchema,
  phone: phoneSchema,
  password: passwordSchema,
});
