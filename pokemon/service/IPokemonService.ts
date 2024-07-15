import { IPokemon } from "../../types/pokemon/IPokemonInterface";

export interface IPokemonService {
  getByIds: (ids: number[]) => Promise<IPokemon[]>
  filterByType: (pokemons: IPokemon[], type: string) => IPokemon[]
}
