import { ZodIssue } from "zod";

export const formatZodErrors: (errors: ZodIssue[]) => string = (
  errors: ZodIssue[]
): string => {
  return errors.map((error: ZodIssue): string => error.message).join(", ");
};
