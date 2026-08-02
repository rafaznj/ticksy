import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { IAssignTicketRepository } from "@/modules/ticket/repositories/contracts/assign";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { inject } from "inversify";

export class AssignTicketRepository implements IAssignTicketRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string, userId: string): Promise<TicketEntity | AppError> {
    const response = await this.axiosSingleton.client.patch<TicketEntity>("ticket/assign", {
      id,
      userId,
    });

    return handleRepositoryResponse(response);
  }
}
