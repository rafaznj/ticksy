import { IPagedResult } from "../../../types/paged-result";
import { IQueryOptions } from "../../../types/query-options";

export interface IGetPagedRepository<T> {
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
