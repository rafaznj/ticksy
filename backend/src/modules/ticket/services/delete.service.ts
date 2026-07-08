import { Inject, Injectable } from "@nestjs/common";
import { BaseDeleteService } from "../../../shared/base/services/delete.service";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IDeleteTicketService } from "./contracts/delete";
import type { IDeleteTicketRepository } from "../repositories/contracts/delete";

@Injectable()
export class DeleteTicketService extends BaseDeleteService implements IDeleteTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.DeleteTicketRepository)
    deleteTicketRepository: IDeleteTicketRepository,
  ) {
    super(deleteTicketRepository);
  }
}
