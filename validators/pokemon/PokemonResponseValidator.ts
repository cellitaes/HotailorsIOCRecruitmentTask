import { injectable } from "inversify";
import { SafeParseReturnType } from "zod";
import { IPokemon } from "../../types/pokemon/IPokemonInterface";
import { pokemonSchema } from "../../schemas/pokemons/pokemonResponseSchema";
import { formatZodErrors } from "../../utils/formatters/formatZodError";
import { HttpError } from "../../errors/HttpError";
import { HttpStatus } from "../../enums/HttpStatus";
import { IPokemonsResponseValidator } from "./types/IPokemonsResponseValidator";

@injectable()
export class PokemonsResponseValidator implements IPokemonsResponseValidator {
  public validatePokemonApiResponse(pokemons: IPokemon[]): IPokemon[] {
    for (const pokemon of pokemons) {
      const parseResult: SafeParseReturnType<IPokemon, IPokemon> =
        pokemonSchema.safeParse(pokemon);

      if (!parseResult.success && parseResult.error.errors.length > 0) {
        const errorMessages: string = formatZodErrors(parseResult.error.errors);

        throw new HttpError(errorMessages, HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }

    return pokemons;
  }
}
