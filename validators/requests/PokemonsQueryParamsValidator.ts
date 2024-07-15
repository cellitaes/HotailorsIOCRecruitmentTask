import { HttpRequest } from "@azure/functions";
import { injectable } from "inversify";
import { get } from "lodash";
import { SafeParseReturnType } from "zod";
import {
  pokemonQueryParamSchema,
  PokeQueryParams,
} from "../../schemas/pokemons/pokemonQueryParamSchema";
import { HttpError } from "../../errors/HttpError";
import { HttpStatus } from "../../enums/HttpStatus";
import { formatZodErrors } from "../../utils/formatters/formatZodError";
import { IPokemonsQueryValidator } from "./types/IPokemonsQueryValidator";

@injectable()
export class PokemonsQueryValidator implements IPokemonsQueryValidator {
  public validateQueryParams(req: HttpRequest): PokeQueryParams {
    const rawIds: string = get(req.query, "id", "");
    const stringIdsArray: string[] = rawIds.split(",");
    const type: string = get(req.query, "type", "");

    const parseResult: SafeParseReturnType<PokeQueryParams, PokeQueryParams> =
      pokemonQueryParamSchema.safeParse({ ids: stringIdsArray, type });

    if (!parseResult.success && parseResult.error.errors.length > 0) {
      const errorMessages: string = formatZodErrors(parseResult.error.errors);

      throw new HttpError(errorMessages, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return parseResult.data;
  }
}
