import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject } from "inversify";
import { BaseDeleteService } from "@/shared/base/services/delete.service";
import type { IDeleteTicketService } from "@/modules/ticket/services/contracts/delete";
import type { IDeleteTicketRepository } from "@/modules/ticket/repositories/contracts/delete";

export class DeleteTicketService extends BaseDeleteService implements IDeleteTicketService {
  constructor(
    @inject(REPOSITORY_TOKENS.DeleteTicketRepository)
    repository: IDeleteTicketRepository,
  ) {
    super(repository);
  }
}
