import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { UserModel } from "../../../user/models/user-model";
import { TicketPagedModel } from "../../models/ticket-paged";

export interface IGetTicketPagedService {
  execute(
    options: IQueryOptions,
    currentUser: Omit<UserModel, "password">,
  ): Promise<IPagedResult<TicketPagedModel>>;
}
