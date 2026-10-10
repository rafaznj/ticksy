import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

import { inject, injectable, unmanaged } from "inversify";

@injectable()
export class BaseGetPagedRepository<T> implements IBaseGetPagedRepository<T> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(@unmanaged() private basePath: string) {}

  async execute(params: PagedParamsQuery): Promise<APIResponse<PagedResponse<T>> | AppError> {
    const response = await this.axiosSingleton.client.get<APIResponse<PagedResponse<T>> | AppError>(
      `${this.basePath}/get-paged`,
      {
        params,
      },
    );

    return handleRepositoryResponse(response);
  }
}
