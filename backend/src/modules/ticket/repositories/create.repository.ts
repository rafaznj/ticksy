import { Injectable } from "@nestjs/common";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { TicketEntity } from "../entity/ticket.entity";
import { ICreateTicketRepository } from "./contracts/create";
import { ticket } from "../../../database/drizzle/schema";
import { CreateTicketDto } from "../dto/create.dto";

@Injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<CreateTicketDto, TicketEntity>
  implements ICreateTicketRepository
{
  constructor() {
    super(ticket);
  }
}
