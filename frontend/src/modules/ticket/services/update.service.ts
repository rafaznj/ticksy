import { inject, injectable } from "inversify";
import { BaseUpdateService } from "@/shared/base/services/update.service";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import type { UpdateTicketDto } from "@/modules/ticket/dtos/update.dto";
import type { IUpdateTicketRepository } from "@/modules/ticket/repositories/contracts/update";

@injectable()
export class UpdateTicketService
  extends BaseUpdateService<UpdateTicketDto>
  implements IUpdateTicketService
{
  constructor(
    @inject(REPOSITORY_TOKENS.UpdateTicketRepository)
    repository: IUpdateTicketRepository,
  ) {
    super(repository);
  }
}
