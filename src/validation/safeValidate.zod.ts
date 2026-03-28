import type { ZodSchema } from "zod";

export function ZodValidate<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors = result.error.flatten().fieldErrors;
  const fields: Record<string, string> = {};

  for (const key in fieldErrors) {
    const messages = fieldErrors[key];
    if (messages && messages.length > 0) {
      fields[key] = messages[0];
    }
  }

  return {
    success: false,
    fields,
  };
}
