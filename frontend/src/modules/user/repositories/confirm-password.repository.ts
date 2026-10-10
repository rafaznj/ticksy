import { inject, injectable } from "inversify";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IConfirmPasswordRepository } from "./contracts/confirm-password";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class ConfirmPasswordRepository implements IConfirmPasswordRepository {
  private readonly basePath = "user";
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axiosSingleton: AxiosSingleton,
  ) {}

  async execute(password: string): Promise<APIResponse<void> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<void>>(
      `${this.basePath}/confirm-password`,
      {
        password,
      },
    );
    return handleRepositoryResponse(response);
  }
}
