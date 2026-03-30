import type { ZodSchema } from "zod";

export function ZodValidate<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const fields: string[] = [];

  for (const issue of result.error.issues) {
    fields.push(issue.message);
  }

  return {
    success: false,
    fields,
  };
}