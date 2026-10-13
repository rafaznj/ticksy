import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { ForgotPasswordData } from "@/modules/user/data/forgot-password";
import type { IForgotPasswordUserRepository } from "@/modules/user/repositories/contracts/forgot-password";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import { inject, injectable } from "inversify";

@injectable()
export class ForgotPasswordUserRepository implements IForgotPasswordUserRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(data: ForgotPasswordData): Promise<APIResponse<void> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<void>>(
      `${this.basePath}/forgot-password`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
