import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Container } from "inversify";
import { ILogger } from "../commonServices/ILogger";
import { Logger } from "../commonServices/Logger";
import { COMMON_TYPES } from "../ioc/commonTypes";
import getContainer from "../ioc/inversify.config";
import { IPokemonsQueryValidator } from "../validators/requests/types/IPokemonsQueryValidator";
import { PokeQueryParams } from "../schemas/pokemons/pokemonQueryParamSchema";
import { responseHandler } from "../utils/responses/responseHandler";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpError } from "../errors/HttpError";
import { INTERNAL_SERVER_ERROR } from "../constants/messages";
import { IFunctionService } from "./services/IFunctionService";

const httpTrigger: AzureFunction = async (
  ctx: Context,
  req: HttpRequest
): Promise<any> => {
  const container: Container = getContainer();
  const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
  logger.init(ctx, "1");

  const functionService: IFunctionService = container.get<IFunctionService>(
    COMMON_TYPES.IFunctionService
  );

  try {
    const pokemonQueryValidator: IPokemonsQueryValidator =
      container.get<IPokemonsQueryValidator>(
        COMMON_TYPES.IPokemonsQueryValidator
      );

    const validatedParams: PokeQueryParams =
      pokemonQueryValidator.validateQueryParams(req);
    const { ids, type } = validatedParams;

    const response: string[] =
      await functionService.getPokemonsByIdsAndTypeCriteria({
        ids,
        type,
      });
    ctx.res = responseHandler(HttpStatus.OK, response);
    return ctx.res;
  } catch (err) {
    if(err instanceof HttpError)
      ctx.res = responseHandler(err.code, {error: err.message});
    else if(err instanceof Error)
      ctx.res = responseHandler(HttpStatus.INTERNAL_ERROR, {error: err.message});
    else ctx.res = responseHandler(HttpStatus.INTERNAL_ERROR, {error: INTERNAL_SERVER_ERROR});
    return ctx.res;
  }
};

export default httpTrigger;
