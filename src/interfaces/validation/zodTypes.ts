import { ZodLoginSchema, ZodRegisterSchema } from "@/validation/schema.zod";
import z from "zod";

export type ZodLoginTypes = z.infer<typeof ZodLoginSchema>;
export type ZodRegisterTypes = z.infer<typeof ZodRegisterSchema>;