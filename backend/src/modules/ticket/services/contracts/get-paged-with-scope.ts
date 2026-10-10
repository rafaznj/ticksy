import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { UserViewModel } from "../../../user/view-models/user.vm";
import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IGetTicketPagedWithScopeService {
  execute(
    options: IQueryOptions,
    currentUser: UserViewModel,
  ): Promise<IPagedResult<TicketViewModel>>;
}
