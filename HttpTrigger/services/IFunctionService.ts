import { IProcessMessageAsyncRequest } from "../types/IFunctionServiceRequests";

export interface IFunctionService {
  getPokemonsByIdsAndTypeCriteria(
    request: IProcessMessageAsyncRequest
  ): Promise<string[]>
}
