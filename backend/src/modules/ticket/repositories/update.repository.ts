import { Injectable } from "@nestjs/common";
import type { IUpdateTicketRepository } from "./contracts/update";
import { BaseUpdateRepository } from "../../../shared/base/repositories/update.repository";
import { UpdateTicketDto } from "../dtos/update.dto";
import { ticket } from "../../../database/drizzle/schema";

@Injectable()
export class UpdateTicketRepository
  extends BaseUpdateRepository<UpdateTicketDto>
  implements IUpdateTicketRepository
{
  constructor() {
    super(ticket);
  }
}
