import { IPokemon } from "../../types/pokemon/IPokemonInterface";

export interface IPokemonClient {
  getByIds: (ids: number[]) => Promise<IPokemon[]>
  getById: (id: number) => Promise<IPokemon>
}
