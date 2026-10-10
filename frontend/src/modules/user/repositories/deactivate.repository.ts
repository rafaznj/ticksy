import { inject, injectable } from "inversify";
import type { IDeactivateUserRepository } from "./contracts/deactivate";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class DeactivateUserRepository implements IDeactivateUserRepository {
  private readonly basePath = "user";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string): Promise<APIResponse<boolean> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<boolean>>(
      `${this.basePath}/deactivate/${id}`,
    );

    return handleRepositoryResponse(response);
  }
}
