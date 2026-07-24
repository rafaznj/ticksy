import { IQueryOptions } from "../../../types/query-options";
import { IPagedResult } from "../../../types/paged-result";

export interface IBaseGetPagedService<T> {
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
