import { injectable } from "inversify";
import { AppError } from "@/shared/errors/app-error";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";

import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

@injectable()
export class BaseGetPagedService<T> implements IBaseGetPagedService<T> {
  constructor(protected readonly repository: IBaseGetPagedRepository<T>) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<T> | AppError> {
    const response = await this.repository.execute(params);

    return handleServiceResponse(response);
  }
}
