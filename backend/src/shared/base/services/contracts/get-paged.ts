import { IPagedResult } from "../../../interfaces/paged-result";
import { IQueryOptions } from "../../../interfaces/query-options";

export interface IBaseGetPagedService<T> {
  execute(options: IQueryOptions): Promise<IPagedResult<T>>;
}
