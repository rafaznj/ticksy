import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

export interface IBaseGetPagedService<T> {
  execute(params: PagedParamsQuery): Promise<PagedResponse<T> | AppError>;
}
