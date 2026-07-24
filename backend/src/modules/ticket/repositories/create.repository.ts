import { Injectable } from "@nestjs/common";
import { BaseCreateRepository } from "../../../shared/base/repositories/create.repository";
import { TicketModel } from "../models/ticket";
import { ICreateTicketRepository } from "./contracts/create";
import { ticket } from "../../../database/drizzle/schema";
import { CreateTicketDto } from "../dtos/create.dto";

@Injectable()
export class CreateTicketRepository
  extends BaseCreateRepository<CreateTicketDto, TicketModel>
  implements ICreateTicketRepository
{
  constructor() {
    super(ticket);
  }
}
