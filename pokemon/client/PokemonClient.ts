import { injectable } from "inversify";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IPokemon } from "../../types/pokemon/IPokemonInterface";
import { POKEMON_API } from "../../config/config";
import { IPokemonClient } from "./IPokemonClient";

@injectable()
export class PokemonClient implements IPokemonClient {
  private readonly _http: AxiosInstance;
  private readonly _url: string = POKEMON_API;

  constructor() {
    this._http = axios.create({
      baseURL: this._url,
    });
  }

  async getByIds(ids: number[]): Promise<IPokemon[]> {
    return Promise.all(
      ids.map((id: number): Promise<IPokemon> => this.getById(id))
    );
  }

  async getById(id: number): Promise<IPokemon> {
    return this._http
      .get<IPokemon>(`pokemon/${id}`)
      .then((res: AxiosResponse<IPokemon>): IPokemon => res.data);
  }
}
