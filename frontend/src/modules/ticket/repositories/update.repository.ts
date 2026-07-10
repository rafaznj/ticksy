import type { UpdateTicketDto } from "@/modules/ticket/dto/update.dto";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IUpdateTicketRepository } from "@/modules/ticket/repositories/contracts/update";
import { BaseUpdateRepository } from "@/shared/base/repositories/update.repository";
import { injectable } from "inversify";

@injectable()
export class UpdateTicketRepository
  extends BaseUpdateRepository<UpdateTicketDto, Ticket>
  implements IUpdateTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
