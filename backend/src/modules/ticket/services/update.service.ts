import { Inject, Injectable } from "@nestjs/common";
import type { IUpdateTicketService } from "./contracts/update";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { BaseUpdateService } from "../../../shared/base/services/update.service";
import type { IUpdateTicketRepository } from "../repositories/contracts/update";
import { UpdateTicketDto } from "../dtos/update.dto";

@Injectable()
export class UpdateTicketService
  extends BaseUpdateService<UpdateTicketDto>
  implements IUpdateTicketService
{
  constructor(
    @Inject(REPOSITORY_TOKENS.UpdateTicketRepository)
    updateTicketRepository: IUpdateTicketRepository,
  ) {
    super(updateTicketRepository);
  }
}
