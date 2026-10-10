import { AxiosSingleton } from "@/lib/axios/axios-singleton";
import { inject, injectable, unmanaged } from "inversify";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { APIResponse } from "@/shared/interfaces/api-response";

@injectable()
export class BaseUpdateRepository<T> implements IBaseUpdateRepository<T> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;
  constructor(@unmanaged() private basePath: string) {}

  async execute(id: string, data: T): Promise<APIResponse<T> | AppError> {
    const response = await this.axiosSingleton.client.put<APIResponse<T> | AppError>(
      `${this.basePath}/update/${id}`,
      data,
    );

    return handleRepositoryResponse(response);
  }
}
