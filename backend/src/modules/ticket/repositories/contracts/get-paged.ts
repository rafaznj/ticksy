import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketPagedModel } from "../../models/ticket-paged";

export interface TicketScope {
  createdById?: string;
  assignedToId?: string;
}

export interface IGetTicketPagedRepository {
  execute(options: IQueryOptions, scope?: TicketScope): Promise<IPagedResult<TicketPagedModel>>;
}
