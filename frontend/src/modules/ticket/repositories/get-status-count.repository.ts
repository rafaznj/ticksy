import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketStatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { IGetTicketStatusCountRepository } from "@/modules/ticket/repositories/contracts/get-status-count";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";

import { inject, injectable } from "inversify";

@injectable()
export class GetTicketStatusCountRepository implements IGetTicketStatusCountRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axios: AxiosSingleton,
  ) {}

  async execute(): Promise<APIResponse<TicketStatusCountDTO[]> | AppError> {
    const response = await this.axios.client.get<APIResponse<TicketStatusCountDTO[]>>(
      `${this.basePath}/get-status-count`,
    );

    return handleRepositoryResponse(response);
  }
}
