import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { UserModel } from "../../entity/user-model";

export interface IGetUserPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<UserModel>>;
}
