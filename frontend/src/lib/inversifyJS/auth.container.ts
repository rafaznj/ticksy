import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import { AuthService } from "@/modules/auth/services/auth.service";
import type { IAuthService } from "@/modules/auth/services/contracts/auth";
import { AuthRepository } from "@/modules/auth/repositories/auth.repository";
import type { IAuthRepository } from "@/modules/auth/repositories/contracts/auth";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";

export const authContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<IAuthRepository>(REPOSITORY_TOKENS.AuthRepository).to(AuthRepository);

  bind<IAuthService>(SERVICE_TOKENS.AuthService).to(AuthService);
});
