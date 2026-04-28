import {
  ZodCompleteRegisterCitizenSchema,
  ZodCompleteRegisterLawyerSchema,
} from "@/validation/auth/CompleteRegister";
import { ZodLoginSchema } from "@/validation/auth/SignIn";
import {
  ZodSignUpLawyerSchema,
  ZodSignUpSchema,
} from "@/validation/auth/SignUp";
import { ZodUpdatePasswordSchema } from "@/validation/auth/UpdatePassword";
import { z } from "zod";

export type ZodLoginTypes = z.infer<typeof ZodLoginSchema>;
export type ZodSignUpTypes = z.infer<typeof ZodSignUpSchema>;
export type ZodSignUpLawyerTypes = z.infer<typeof ZodSignUpLawyerSchema>;
export type ZodUpdatePasswordTypes = z.infer<typeof ZodUpdatePasswordSchema>;
export type ZodCitizenCompleteRegisterTypes = z.infer<
  typeof ZodCompleteRegisterCitizenSchema
>;
export type ZodLawyerCompleteRegisterTypes = z.infer<
  typeof ZodCompleteRegisterLawyerSchema
>;
