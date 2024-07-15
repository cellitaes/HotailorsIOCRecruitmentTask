import { z, ZodSchema } from "zod";

export const pokemonQueryParamSchema: ZodSchema = z.object({
  ids: z.array(z.string().regex(/^\d+$/).transform(Number)).nonempty(),
  type: z.string().optional(),
});

export type PokeQueryParams = {
  ids: number[]
  type?: string
};
