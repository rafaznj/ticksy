import { inject, injectable } from "inversify";

import { useAuthStore } from "@/lib/zustand/use-auth";
import type { ILogoutRepository } from "@/modules/auth/repositories/contracts/logout";
import type { ILogoutService } from "@/modules/auth/services/contracts/logout";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";

@injectable()
export class LogoutService implements ILogoutService {
  constructor(
    @inject(REPOSITORY_TOKENS.LogoutRepository)
    private readonly logoutRepository: ILogoutRepository,
  ) {}

  async execute(): Promise<void | AppError> {
    const response = await this.logoutRepository.execute();

    if (response instanceof AppError) {
      throw response;
    }

    useAuthStore.getState().clearAuth();
  }
}
