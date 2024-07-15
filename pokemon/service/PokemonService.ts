import { inject, injectable } from "inversify";
import { filter, some } from "lodash";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { IPokemonClient } from "../client/IPokemonClient";
import { IPokemon, IPokemonType } from "../../types/pokemon/IPokemonInterface";
import { IPokemonsResponseValidator } from "../../validators/pokemon/types/IPokemonsResponseValidator";
import { IPokemonService } from "./IPokemonService";

@injectable()
export class PokemonService implements IPokemonService {
  @inject(COMMON_TYPES.IPokemonClient)
  private readonly _pokemonClient: IPokemonClient;

  @inject(COMMON_TYPES.IPokemonsResponseValidator)
  private readonly _pokemonsResponseValidator: IPokemonsResponseValidator;

  async getByIds(ids: number[]): Promise<IPokemon[]> {
    const pokemons: IPokemon[] = await this._pokemonClient.getByIds(ids);
    return this._pokemonsResponseValidator.validatePokemonApiResponse(pokemons);
  }

  filterByType(pokemons: IPokemon[], type: string): IPokemon[] {
    return filter(pokemons, (pokemon: IPokemon): boolean =>
      some(
        pokemon.types,
        (pokeType: IPokemonType): boolean => pokeType.type.name === type
      )
    );
  }
}
