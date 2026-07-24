import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketPagedModel } from "../../models/ticket-paged";

export interface IGetTicketPagedRepository {
  execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedModel>>;
}
