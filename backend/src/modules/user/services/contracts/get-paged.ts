import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { UserPagedViewModel } from "../../view-models/user-paged.vm";

export interface IGetUserPagedService {
  execute(options: IQueryOptions): Promise<IPagedResult<UserPagedViewModel>>;
}
