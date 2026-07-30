import { Inject } from "@nestjs/common";
import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { IChangeStatusTicketService } from "./contracts/change-status";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IChangeStatusTicketRepository } from "../repositories/contracts/change-status";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";

export class ChangeStatusTicketService implements IChangeStatusTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.ChangeStatusTicketRepository)
    private readonly changeStatusTicketRepository: IChangeStatusTicketRepository,
  ) {}

  async execute(id: string, status: TicketStatusEnum): Promise<TicketModel | null> {
    const response = await this.changeStatusTicketRepository.execute(id, status);

    if (!response) {
      throw AppException.notFound("ticket.errors.notFound");
    }

    return response;
  }
}
