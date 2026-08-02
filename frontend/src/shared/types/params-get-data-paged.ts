import type { QueryContext } from "@/lib/tanstack/query-context";
import type { QueryError, QuerySuccess } from "@/lib/tanstack/query-types";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

export interface ParamsGetDataPaged<T> {
  params: PagedParamsQuery;
  context: QueryContext;
  onSuccess?: QuerySuccess<PagedResponse<T>>;
  onError?: QueryError;
}
