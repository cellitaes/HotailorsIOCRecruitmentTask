import { HttpRequest } from "@azure/functions";
import { PokeQueryParams } from "../../../schemas/pokemons/pokemonQueryParamSchema";

export interface IPokemonsQueryValidator {
  validateQueryParams: (queryParams: HttpRequest) => PokeQueryParams
}
