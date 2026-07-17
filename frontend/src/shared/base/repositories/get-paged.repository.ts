import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleResponse } from "@/shared/errors/handle-response";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import { inject, injectable, unmanaged } from "inversify";

@injectable()
export class BaseGetPagedRepository<T> implements IBaseGetPagedRepository<T> {
  @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
  private axiosSingleton!: AxiosSingleton;

  constructor(@unmanaged() private basePath: string) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<T> | AppError> {
    const response = await this.axiosSingleton.client.get<PagedResponse<T> | AppError>(
      `${this.basePath}/paged`,
      {
        params,
      },
    );

    return handleResponse(response);
  }
}
