import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { ErrorHandlerService } from "@/shared/errors/error-handler.service";
import type { IErrorHandlerService } from "@/shared/errors/contracts/error";

export const utilsContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<AxiosSingleton>(INFRASTRUCTURE_TOKENS.AxiosSingleton).to(AxiosSingleton).inSingletonScope();

  bind<IErrorHandlerService>(INFRASTRUCTURE_TOKENS.ErrorHandlerService).to(ErrorHandlerService);
});
