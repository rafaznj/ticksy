import { injectable, injectFromBase } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { TicketEntity } from "@/modules/ticket/mo/ticket.entity";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";

@injectFromBase()
@injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<TicketEntity>
  implements IGetTicketByIdRepository
{
  constructor() {
    super("/ticket");
  }
}
