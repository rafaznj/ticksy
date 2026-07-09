import { BaseCreateService } from "@/shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { ICreateTicketRepository } from "../repositories/contracts/create";
import type { ICreateTicketService } from "./contracts/create";
import { inject } from "inversify";
import type { CreateTicketDto } from "@/modules/ticket/dto/create.dto";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";

export class CreateTicketService
  extends BaseCreateService<CreateTicketDto, Ticket>
  implements ICreateTicketService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CreateTicketRepository)
    repository: ICreateTicketRepository,
  ) {
    super(repository);
  }
}
