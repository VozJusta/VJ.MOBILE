import { ZodLoginSchema, ZodSingUpSchema, ZodUpdatePasswordSchema } from "@/validation/schema.zod";
import { z } from "zod";

export type ZodLoginTypes = z.infer<typeof ZodLoginSchema>;
export type ZodSingUpTypes = z.infer<typeof ZodSingUpSchema>;
export type ZodUpdatePasswordTypes = z.infer<typeof ZodUpdatePasswordSchema>;