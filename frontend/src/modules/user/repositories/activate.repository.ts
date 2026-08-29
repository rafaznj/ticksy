import { inject, injectable } from "inversify";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import type { IActivateUserRepository } from "@/modules/user/repositories/contracts/activate";

@injectable()
export class ActivateUserRepository implements IActivateUserRepository {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  async execute(id: string): Promise<boolean | AppError> {
    const response = await this.axiosSingleton.client.patch<boolean>(`/user/${id}/activate`);

    return handleRepositoryResponse(response);
  }
}
