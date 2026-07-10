import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";

export const utilsContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<AxiosSingleton>(INFRASTRUCTURE_TOKENS.AxiosSingleton).to(AxiosSingleton).inSingletonScope();
});
