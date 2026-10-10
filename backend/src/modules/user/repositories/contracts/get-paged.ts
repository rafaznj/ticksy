import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { UserViewModel } from "../../view-models/user.vm";

export interface IGetUserPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<UserViewModel>>;
}
