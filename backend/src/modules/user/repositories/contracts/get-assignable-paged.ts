import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import type { IQueryOptions } from "../../../../shared/interfaces/query-options";
import type { UserViewModel } from "../../view-models/user.vm";

export interface IGetAssignableUsersPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<UserViewModel>>;
}
