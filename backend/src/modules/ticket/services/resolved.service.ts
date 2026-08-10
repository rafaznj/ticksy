import { Inject } from "@nestjs/common";
import { IResolvedTicketService } from "./contracts/resolved";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IResolvedTicketRepository } from "../repositories/contracts/resolved";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";

export class ResolvedTicketService implements IResolvedTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.ResolvedTicketRepository)
    private readonly changeStatusTicketRepository: IResolvedTicketRepository,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const response = await this.changeStatusTicketRepository.execute(id);

    if (!response) {
      throw AppException.notFound("ticket.errors.notFound");
    }

    return response;
  }
}
