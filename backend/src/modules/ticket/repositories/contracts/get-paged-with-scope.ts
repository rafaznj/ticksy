import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { TicketViewModel } from "../../view-models/ticket.vm";
import { TicketScopeViewModel } from "../../view-models/scope.vm";

export interface IGetTicketPagedWithScopeRepository {
  execute(
    options: IQueryOptions,
    scope?: TicketScopeViewModel,
  ): Promise<IPagedResult<TicketViewModel>>;
}
