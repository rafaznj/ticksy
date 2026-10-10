import { inject, injectable } from "inversify";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { IActivateUserRepository } from "@/modules/user/repositories/contracts/activate";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class ActivateUserRepository implements IActivateUserRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string): Promise<APIResponse<boolean> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<boolean>>(
      `${this.basePath}/activate/${id}`,
    );

    return handleRepositoryResponse(response);
  }
}
