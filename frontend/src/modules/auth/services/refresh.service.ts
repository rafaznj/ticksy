import { inject, injectable } from "inversify";

import { useAuthStore } from "@/lib/zustand/use-auth";
import type { IRefreshRepository } from "@/modules/auth/repositories/contracts/refresh";
import type { IRefreshService } from "@/modules/auth/services/contracts/refresh";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { AppError } from "@/shared/errors/app-error";

@injectable()
export class RefreshService implements IRefreshService {
  constructor(
    @inject(REPOSITORY_TOKENS.RefreshRepository)
    private readonly refreshRepository: IRefreshRepository,
  ) {}

  async execute(): Promise<void | AppError> {
    const response = await this.refreshRepository.execute();

    if (response instanceof AppError) {
      throw response;
    }

    useAuthStore.setState({ accessToken: response.accessToken });
  }
}
