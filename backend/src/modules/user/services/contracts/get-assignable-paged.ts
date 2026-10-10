import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import type { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { UserPagedViewModel } from "../../view-models/user-paged.vm";

export interface IGetAssignableUsersPagedService {
  execute(options: IQueryOptions): Promise<IPagedResult<UserPagedViewModel>>;
}
