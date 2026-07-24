import { BaseCreateService } from "@/shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { ICreateTicketRepository } from "../repositories/contracts/create";
import type { ICreateTicketService } from "./contracts/create";
import { inject } from "inversify";
import type { CreateTicketDto } from "@/modules/ticket/dtos/create.dto";
import type { TicketEntity } from "@/modules/ticket/mo/ticket.entity";

export class CreateTicketService
  extends BaseCreateService<CreateTicketDto, TicketEntity>
  implements ICreateTicketService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CreateTicketRepository)
    repository: ICreateTicketRepository,
  ) {
    super(repository);
  }
}
