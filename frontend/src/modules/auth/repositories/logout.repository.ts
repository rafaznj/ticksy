import { inject, injectable } from "inversify";

import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { ILogoutRepository } from "./contracts/logout";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";

@injectable()
export class LogoutRepository implements ILogoutRepository {
  private basePath = "auth";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(): Promise<void | AppError> {
    const response = await this.axiosSingleton.client.post(`${this.basePath}/logout`);
    return handleResponse(response);
  }
}
