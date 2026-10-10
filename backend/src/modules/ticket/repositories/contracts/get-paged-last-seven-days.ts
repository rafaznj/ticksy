import { IPagedResult } from "../../../../shared/interfaces/paged-result";
import { IQueryOptions } from "../../../../shared/interfaces/query-options";
import { TicketPagedLastSevenDaysViewModel } from "../../view-models/paged-last-seven-day.vm";
import { TicketScopeViewModel } from "../../view-models/scope.vm";

export interface IGetTicketPagedLastSevenDaysRepository {
  execute(
    options: IQueryOptions,
    scope?: TicketScopeViewModel,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysViewModel>>;
}
