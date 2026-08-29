import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { TicketModel } from "../models/ticket";
import { AppException } from "../../../shared/exceptions/app-exception";
import { SERVICE_TOKENS } from "../../../shared/di/tokens.services";
import type { IGetTicketByIdService } from "./contracts/get-by-id";
import { IUnassignTicketService } from "./contracts/unassign";
import type { IUnassignTicketRepository } from "../repositories/contracts/unassign";

@Injectable()
export class UnassignTicketService implements IUnassignTicketService {
  constructor(
    @Inject(REPOSITORY_TOKENS.UnassignTicketRepository)
    private readonly unassignTicketRepository: IUnassignTicketRepository,
    @Inject(SERVICE_TOKENS.GetTicketByIdService)
    private readonly getTicketByIdService: IGetTicketByIdService,
  ) {}

  async execute(id: string): Promise<TicketModel | null> {
    const ticket = await this.getTicketByIdService.execute(id);

    if (!ticket) {
      throw AppException.notFound("ticket.errors.notFound");
    }

    if (!ticket.assignedToId) {
      throw AppException.conflict("ticket.errors.notAssigned");
    }

    const response = await this.unassignTicketRepository.execute(id);

    if (!response) {
      throw AppException.notFound("ticket.errors.notFound");
    }

    return response;
  }
}
