import { z, ZodSchema } from "zod";

const pokemonTypeSchema: ZodSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
});

export const pokemonSchema: ZodSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(pokemonTypeSchema),
});
