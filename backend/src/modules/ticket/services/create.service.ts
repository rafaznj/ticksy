import { Inject, Injectable } from "@nestjs/common";

import { BaseCreateService } from "../../../shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateTicketDto } from "../dto/create.dto";
import { ICreateTicketService } from "./contracts/create";
import type { ICreateTicketRepository } from "../repositories/contracts/create";
import { TicketEntity } from "../entity/ticket.entity";

@Injectable()
export class CreateTicketService
  extends BaseCreateService<CreateTicketDto, TicketEntity>
  implements ICreateTicketService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateTicketRepository)
    createTicketRepository: ICreateTicketRepository,
  ) {
    super(createTicketRepository);
  }
}
