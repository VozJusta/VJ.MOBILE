import { ZodLoginSchema, ZodSignUpSchema, ZodUpdatePasswordSchema } from "@/validation/schema.zod";
import { z } from "zod";

export type ZodLoginTypes = z.infer<typeof ZodLoginSchema>;
export type ZodSignUpTypes = z.infer<typeof ZodSignUpSchema>;
export type ZodSignUpLawyerTypes = z.infer<typeof ZodSignUpSchema>;
export type ZodUpdatePasswordTypes = z.infer<typeof ZodUpdatePasswordSchema>;
