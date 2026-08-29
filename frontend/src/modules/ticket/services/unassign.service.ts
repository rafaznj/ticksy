import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { IUnassignTicketRepository } from "@/modules/ticket/repositories/contracts/unassign";
import type { IUnassignTicketService } from "@/modules/ticket/services/contracts/unassign";

@injectable()
export class UnassignTicketService implements IUnassignTicketService {
  constructor(
    @inject(REPOSITORY_TOKENS.UnassignTicketRepository)
    private readonly unassignTicketRepository: IUnassignTicketRepository,
  ) {}

  async execute(id: string): Promise<TicketEntity | AppError> {
    const response = await this.unassignTicketRepository.execute(id);

    return handleServiceResponse(response);
  }
}
