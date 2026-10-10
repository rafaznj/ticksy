import { injectable, injectFromBase } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { TicketDto } from "../dtos/ticket.dto";
import type { ICreateTicketRepository } from "./contracts/create";
import type { CreateTicketData } from "@/modules/ticket/data/create.data";

@injectFromBase()
@injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<CreateTicketData, TicketDto>
  implements ICreateTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
