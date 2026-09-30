import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { StatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { IGetTicketStatusCountRepository } from "@/modules/ticket/repositories/contracts/get-status-count";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { inject, injectable } from "inversify";

@injectable()
export class GetTicketStatusCountRepository implements IGetTicketStatusCountRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private readonly axios: AxiosSingleton,
  ) {}

  async execute(): Promise<StatusCountDTO[] | AppError> {
    const response = await this.axios.client.get<StatusCountDTO[]>(
      `${this.basePath}/get-status-count`,
    );

    return handleRepositoryResponse(response);
  }
}
