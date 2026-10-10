import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { AppError } from "@/shared/errors/app-error";
import { inject, injectable } from "inversify";
import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { IResolvedTicketService } from "@/modules/ticket/services/contracts/resolved";
import type { IResolvedTicketRepository } from "@/modules/ticket/repositories/contracts/resolved";

@injectable()
export class ResolvedTicketService implements IResolvedTicketService {
  constructor(
    @inject(REPOSITORY_TOKENS.ResolvedTicketRepository)
    private readonly resolvedTicketRepository: IResolvedTicketRepository,
  ) {}

  async execute(id: string): Promise<TicketDto | AppError> {
    const response = await this.resolvedTicketRepository.execute(id);

    return handleServiceResponse(response);
  }
}
