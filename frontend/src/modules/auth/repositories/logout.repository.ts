import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { ILogoutRepository } from "./contracts/logout";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class LogoutRepository implements ILogoutRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<APIResponse<void> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<void> | AppError>(
      `${this.basePath}/logout`,
    );

    return handleRepositoryResponse(response);
  }
}
