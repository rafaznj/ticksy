import { BaseGetPagedRepository } from "@/shared/base/repositories/get-paged.repository";
import { injectable, injectFromBase } from "inversify";
import type { TicketEntity } from "../../../../../backend/dist/src/modules/ticket/entity/ticket.entity";
import type { IGetTicketPagedRepository } from "@/modules/ticket/repositories/contracts/get-paged";

@injectFromBase()
@injectable()
export class GetTicketPagedRepository
  extends BaseGetPagedRepository<TicketEntity>
  implements IGetTicketPagedRepository
{
  constructor() {
    super("/ticket");
  }
}
