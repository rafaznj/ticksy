import { IPagedResult } from "../../../interfaces/paged-result";
import { IQueryOptions } from "../../../interfaces/query-options";

export interface IBaseGetPagedRepository<T> {
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
