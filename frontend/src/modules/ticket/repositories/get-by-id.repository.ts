import { injectable } from "inversify";
import { BaseGetByIdRepository } from "@/shared/base/repositories/get-by-id.repository";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IGetTicketByIdRepository } from "@/modules/ticket/repositories/contracts/get-by-id";

@injectable()
export class GetTicketByIdRepository
  extends BaseGetByIdRepository<Ticket>
  implements IGetTicketByIdRepository
{
  constructor() {
    super("/ticket");
  }
}
