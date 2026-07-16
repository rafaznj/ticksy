import { injectable, injectFromBase } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";

@injectFromBase()
@injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<Ticket>
  implements IGetTicketByIdRepository
{
  constructor() {
    super("/ticket");
  }
}
