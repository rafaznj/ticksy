import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketPagedLastSevenDaysModel } from "../../models/ticket-paged-last-seven-day";
import { TicketScope } from "../../models/ticket-scope";

export interface IGetTicketPagedLastSevenDaysRepository {
  execute(
    options: IQueryOptions,
    scope?: TicketScope,
  ): Promise<IPagedResult<TicketPagedLastSevenDaysModel>>;
}
