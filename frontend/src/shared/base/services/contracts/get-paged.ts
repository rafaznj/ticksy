import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface IBaseGetPagedService<T> {
  execute(params: PagedParamsQuery): Promise<PagedResponse<T> | AppError>;
}
