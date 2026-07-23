import { ticket } from "../../../database/drizzle/schema";
import { BaseGetPagedRepository } from "../../../shared/base/repositories/get-paged.repository";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IQueryOptions } from "../../../shared/types/query-options";
import { TicketEntity } from "../entity/ticket.entity";
import { IGetTicketPagedRepository } from "./contracts/get-paged";

export class GetTicketPagedRepository
  extends BaseGetPagedRepository<TicketEntity>
  implements IGetTicketPagedRepository
{
  constructor() {
    super(ticket);
  }

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketEntity>> {
    const response = await super.execute(options);
    return response;
  }
}
