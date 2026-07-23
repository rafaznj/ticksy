import { IPagedResult } from "../../../../shared/types/paged-result";
import { IQueryOptions } from "../../../../shared/types/query-options";
import { TicketEntity } from "../../entity/ticket.entity";

export interface IGetTicketPagedService {
  execute(options: IQueryOptions): Promise<IPagedResult<TicketEntity>>;
}
