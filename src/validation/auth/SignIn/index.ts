import z from "zod";

export const ZodLoginSchema = z.object({
  email: z.email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});
