import type { QueryContext } from "@/lib/tanstack/query-context";
import type { QueryError, QuerySuccess } from "@/lib/tanstack/query-types";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface ParamsGetDataPaged<T> {
  params: PagedParamsQuery;
  context: QueryContext;
  onSuccess?: QuerySuccess<PagedResponse<T>>;
  onError?: QueryError;
}
