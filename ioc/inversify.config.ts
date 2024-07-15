import "reflect-metadata";
import { Container } from "inversify";
import { Logger } from "../commonServices/Logger";
import { ILogger } from "../commonServices/ILogger";
import { IFunctionService } from "../HttpTrigger/services/IFunctionService";
import { FunctionService } from "../HttpTrigger/services/FunctionService";
import { PokemonClient } from "../pokemon/client/PokemonClient";
import { IPokemonClient } from "../pokemon/client/IPokemonClient";
import { IPokemonService } from "../pokemon/service/IPokemonService";
import { PokemonService } from "../pokemon/service/PokemonService";
import { PokemonsQueryValidator } from "../validators/requests/PokemonsQueryParamsValidator";
import { IPokemonsQueryValidator } from "../validators/requests/types/IPokemonsQueryValidator";
import { IPokemonsResponseValidator } from "../validators/pokemon/types/IPokemonsResponseValidator";
import { PokemonsResponseValidator } from "../validators/pokemon/PokemonResponseValidator";
import { COMMON_TYPES } from "./commonTypes";

const getContainer: () => Container = (): Container => {
  const container: Container = new Container();

  container.bind<ILogger>(COMMON_TYPES.ILogger).to(Logger).inSingletonScope();

  container
    .bind<IFunctionService>(COMMON_TYPES.IFunctionService)
    .to(FunctionService);

  container.bind<IPokemonClient>(COMMON_TYPES.IPokemonClient).to(PokemonClient);

  container
    .bind<IPokemonService>(COMMON_TYPES.IPokemonService)
    .to(PokemonService);

  container
    .bind<IPokemonsQueryValidator>(COMMON_TYPES.IPokemonsQueryValidator)
    .to(PokemonsQueryValidator);

  container
    .bind<IPokemonsResponseValidator>(COMMON_TYPES.IPokemonsResponseValidator)
    .to(PokemonsResponseValidator);

  return container;
};

export default getContainer;
