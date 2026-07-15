import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";

import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { LoginRepository } from "@/modules/auth/repositories/login.repository";
import type { ILoginRepository } from "@/modules/auth/repositories/contracts/login";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { LoginService } from "@/modules/auth/services/login.service";
import { LogoutRepository } from "@/modules/auth/repositories/logout.repository";
import type { ILogoutRepository } from "@/modules/auth/repositories/contracts/logout";
import type { ILogoutService } from "@/modules/auth/services/contracts/logout";
import { LogoutService } from "@/modules/auth/services/logout.service";
import type { IRefreshRepository } from "@/modules/auth/repositories/contracts/refresh";
import { RefreshRepository } from "@/modules/auth/repositories/refresh.repository";
import type { IRefreshService } from "@/modules/auth/services/contracts/refresh";
import { RefreshService } from "@/modules/auth/services/refresh.service";

export const authContainerModule = new ContainerModule(({ bind }: ContainerModuleLoadOptions) => {
  bind<ILoginRepository>(REPOSITORY_TOKENS.LoginRepository).to(LoginRepository);
  bind<ILoginService>(SERVICE_TOKENS.LoginService).to(LoginService);

  bind<ILogoutRepository>(REPOSITORY_TOKENS.LogoutRepository).to(LogoutRepository);
  bind<ILogoutService>(SERVICE_TOKENS.LogoutService).to(LogoutService);

  bind<IRefreshRepository>(REPOSITORY_TOKENS.RefreshRepository).to(RefreshRepository);
  bind<IRefreshService>(SERVICE_TOKENS.RefreshService).to(RefreshService);
});
