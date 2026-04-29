import { cpfSchema, oabNumberSchema, passwordSchema, phoneSchema } from "@/utils/validation";
import z from "zod";

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