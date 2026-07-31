import type { IPagedResult } from "../../../../shared/types/paged-result";
import type { IQueryOptions } from "../../../../shared/types/query-options";
import type { UserModel } from "../../models/user-model";

export interface IGetAssignableUsersPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<UserModel>>;
}
