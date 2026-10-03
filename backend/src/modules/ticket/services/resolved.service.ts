import { Inject } from "@nestjs/common";
import { IResolvedTicketService } from "./contracts/resolved";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import type { IResolvedTicketRepository } from "../repositories/contracts/resolved";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";
import type { IGetTicketByIdService } from "./contracts/get-by-id";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";

export class ResolvedTicketService implements IResolvedTicketService {
  constructor(
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
    @Inject(REPOSITORY_TOKENS.ResolvedTicketRepository)
    private readonly changeStatusTicketRepository: IResolvedTicketRepository,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const ticket = await this.getTicketByIdService.execute(id);

    if (!ticket) {
      throw AppException.notFound("ticket.messages.errors.notFound");
    }

    const response = await this.changeStatusTicketRepository.execute(id);

    if (!response) {
      throw AppException.notFound("ticket.messages.errors.resolveFailed");
    }

    return response;
  }
}
