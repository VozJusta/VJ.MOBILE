import { passwordSchema } from "@/utils/validation";
import z from "zod";

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