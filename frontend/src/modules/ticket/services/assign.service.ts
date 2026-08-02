import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import type { IAssignTicketRepository } from "@/modules/ticket/repositories/contracts/assign";
import type { IAssignTicketService } from "@/modules/ticket/services/contracts/assign";
import { handleServiceResponse } from "@/shared/response/handle-service-response";

@injectable()
export class AssignTicketService implements IAssignTicketService {
  constructor(
    @inject(REPOSITORY_TOKENS.AssignTicketRepository)
    private readonly assignTicketRepository: IAssignTicketRepository,
  ) {}

  async execute(id: string, userId: string): Promise<TicketEntity | AppError> {
    const response = await this.assignTicketRepository.execute(id, userId);

    return handleServiceResponse(response);
  }
}
