import { IPokemon } from "../../../types/pokemon/IPokemonInterface";

export interface IPokemonsResponseValidator {
  validatePokemonApiResponse: (pokemons: IPokemon[]) => IPokemon[]
}
