import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketAssignDto } from "@/modules/ticket/dtos/assign.dto";
import type { IAssignTicketRepository } from "@/modules/ticket/repositories/contracts/assign";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import { inject } from "inversify";

export class AssignTicketRepository implements IAssignTicketRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(id: string, userId: string): Promise<APIResponse<TicketAssignDto> | AppError> {
    const response = await this.axiosSingleton.client.patch<
      APIResponse<TicketAssignDto> | AppError
    >(`${this.basePath}/assign/${id}`, {
      userId,
    });

    return handleRepositoryResponse(response);
  }
}
