import { BaseCreateService } from "@/shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { ICreateTicketRepository } from "../repositories/contracts/create";
import type { ICreateTicketService } from "./contracts/create";
import { inject } from "inversify";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { CreateTicketData } from "@/modules/ticket/data/create.data";

export class CreateTicketService
  extends BaseCreateService<CreateTicketData, TicketDto>
  implements ICreateTicketService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CreateTicketRepository)
    repository: ICreateTicketRepository,
  ) {
    super(repository);
  }
}
