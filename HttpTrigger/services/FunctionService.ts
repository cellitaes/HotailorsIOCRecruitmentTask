import { inject, injectable } from "inversify";
import { ILogger } from "../../commonServices/ILogger";
import { COMMON_TYPES } from "../../ioc/commonTypes";
import { IPokemonService } from "../../pokemon/service/IPokemonService";
import { IPokemon } from "../../types/pokemon/IPokemonInterface";
import { IFunctionService } from "./IFunctionService";

@injectable()
export class FunctionService implements IFunctionService {
  @inject(COMMON_TYPES.ILogger)
  private readonly _logger: ILogger;

  @inject(COMMON_TYPES.IPokemonService)
  private readonly _pokemonService: IPokemonService;

  public async getPokemonsByIdsAndTypeCriteria({
    ids,
    type,
  }: {
    ids: number[]
    type: string
  }): Promise<string[]> {
    const fetchedPokemons: IPokemon[] = await this._pokemonService.getByIds(
      ids
    );

    const filtratedPokemonsByType: IPokemon[] =
      this._pokemonService.filterByType(fetchedPokemons, type);
    const filtratedPokemonsName: string[] = filtratedPokemonsByType.map(
      (pokemon: IPokemon): string => pokemon.name
    );

    return filtratedPokemonsName;
  }
}
