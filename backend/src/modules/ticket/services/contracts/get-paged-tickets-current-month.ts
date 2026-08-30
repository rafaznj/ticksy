import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketPagedCurrentMonthModel } from "../../models/ticket-paged-current-month";

export interface IGetTicketPagedCurrentMonthService {
  execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedCurrentMonthModel>>;
}
