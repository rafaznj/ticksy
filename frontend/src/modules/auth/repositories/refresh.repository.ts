import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { RefreshResponse } from "@/modules/auth/dto/refresh-response.dto";
import type { IRefreshRepository } from "./contracts/refresh";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class RefreshRepository implements IRefreshRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<RefreshResponse | AppError> {
    const response = await this.axiosSingleton.client.post<RefreshResponse>(
      `${this.basePath}/refresh`,
    );
    return handleResponse(response);
  }
}
