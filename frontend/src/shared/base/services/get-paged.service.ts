import { injectable } from "inversify";
import { AppError } from "@/shared/errors/app-error";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import type { IBaseGetPagedRepository } from "@/shared/base/repositories/contracts/get-paged";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

@injectable()
export class BaseGetPagedService<T> implements IBaseGetPagedService<T> {
  constructor(protected readonly repository: IBaseGetPagedRepository<T>) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<T> | AppError> {
    const response = await this.repository.execute(params);
    if (response instanceof AppError) {
      throw response;
    }

    return response;
  }
}
