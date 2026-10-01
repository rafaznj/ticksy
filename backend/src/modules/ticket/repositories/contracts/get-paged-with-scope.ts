import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketPagedModel } from "../../models/ticket-paged";
import { TicketScope } from "../../models/ticket-scope";

export interface IGetTicketPagedWithScopeRepository {
  execute(options: IQueryOptions, scope?: TicketScope): Promise<IPagedResult<TicketPagedModel>>;
}
