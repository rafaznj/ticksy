import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { UserModel } from "../../models/user-model";

export interface IGetUserPagedService {
  execute(options: IQueryOptions): Promise<IPagedResult<UserModel>>;
}
