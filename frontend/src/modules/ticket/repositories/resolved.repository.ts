import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { IResolvedTicketRepository } from "@/modules/ticket/repositories/contracts/resolved";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";

import { inject } from "inversify";

export class ResolvedTicketRepository implements IResolvedTicketRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string): Promise<APIResponse<TicketDto> | AppError> {
    const response = await this.axiosSingleton.client.patch<APIResponse<TicketDto>>(
      `${this.basePath}/resolved/${id}`,
    );

    return handleRepositoryResponse(response);
  }
}
