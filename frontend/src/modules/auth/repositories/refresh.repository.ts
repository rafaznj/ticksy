import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { RefreshDto } from "@/modules/auth/dto/refresh.dto";
import type { IRefreshRepository } from "./contracts/refresh";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class RefreshRepository implements IRefreshRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<APIResponse<RefreshDto> | AppError> {
    const response = await this.axiosSingleton.client.post<APIResponse<RefreshDto> | AppError>(
      `${this.basePath}/refresh`,
    );

    return handleRepositoryResponse(response);
  }
}
