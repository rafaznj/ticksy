import { Injectable } from "@nestjs/common";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { Ticket } from "../entity/ticket.entity";
import { ICreateTicketRepository } from "./contracts/create";
import { ticket } from "../../../database/drizzle/schema";

@Injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<Ticket>
  implements ICreateTicketRepository
{
  constructor() {
    super(ticket);
  }
}
