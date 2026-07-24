import { injectable, injectFromBase } from "inversify";
import { BaseCreateRepository } from "@/shared/base/repositories/create.repository";
import type { CreateTicketDto } from "../dtos/create.dto";
import type { TicketEntity } from "../mo/ticket.entity";
import type { ICreateTicketRepository } from "./contracts/create";

@injectFromBase()
@injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<CreateTicketDto, TicketEntity>
  implements ICreateTicketRepository
{
  constructor() {
    super("/ticket");
  }
}
