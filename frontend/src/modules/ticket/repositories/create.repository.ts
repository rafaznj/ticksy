import { injectable, injectFromBase } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { CreateTicketDto } from "../dto/create.dto";
import type { Ticket } from "../entity/ticket.entity";
import type { ICreateTicketRepository } from "./contracts/create";

@injectFromBase()
@injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<CreateTicketDto, Ticket>
  implements ICreateTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
