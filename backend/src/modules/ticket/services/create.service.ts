import { Inject, Injectable } from "@nestjs/common";

import { BaseCreateService } from "../../../shared/base/services/create.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { CreateTicketDto } from "../dto/create.dm";
import { ICreateTicketService } from "./contracts/create";
import type { ICreateTicketRepository } from "../repositories/contracts/create";

@Injectable()
export class CreateTicketService
  extends BaseCreateService<CreateTicketDto>
  implements ICreateTicketService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.CreateTicketRepository)
    private readonly createTicketRepository: ICreateTicketRepository,
  ) {
    super(createTicketRepository);
  }
}
