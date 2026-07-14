import { inject, injectable } from "inversify";

import { useAuthStore } from "@/lib/zustand/use-auth";
import type { ILogoutRepository } from "@/modules/auth/repositories/contracts/logout";
import type { ILogoutService } from "@/modules/auth/services/contracts/logout";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";

@injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @inject(REPOSITORY_TOKENS.LogoutRepository)
    private readonly logoutRepository: ILogoutRepository,
  ) {}

  async execute(): Promise<void> {
    const response = await this.logoutRepository.execute();

    useAuthStore.getState().clearAuth();

    return response;
  }
}
