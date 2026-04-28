import {
  cpfSchema,
  oabNumberSchema,
  passwordSchema,
  phoneSchema,
} from "@/utils/validation";
import { z } from "zod";




export const ZodCompleteRegisterSharedSchema = z.object({
  cpf: cpfSchema,
  phone: phoneSchema,
  password: passwordSchema,
});

export const ZodCompleteRegisterCitizenSchema = ZodCompleteRegisterSharedSchema;

export const ZodCompleteRegisterLawyerSchema =
  ZodCompleteRegisterSharedSchema.extend({
    oabNumber: oabNumberSchema,
    oabState: z.string().min(1, "Estado da OAB é obrigatório"),
    specialization: z.string().min(1, "Especialização é obrigatória"),
  });
