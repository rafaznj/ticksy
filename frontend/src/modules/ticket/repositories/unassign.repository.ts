import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { IUnassignTicketRepository } from "@/modules/ticket/repositories/contracts/unassign";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { inject } from "inversify";

export class UnassignTicketRepository implements IUnassignTicketRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string): Promise<TicketEntity | AppError> {
    const response = await this.axiosSingleton.client.patch<TicketEntity>("ticket/unassign", {
      id,
    });

    return handleRepositoryResponse(response);
  }
}
