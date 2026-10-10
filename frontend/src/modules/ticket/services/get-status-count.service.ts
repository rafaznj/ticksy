import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { AppError } from "@/shared/errors/app-error";
import type { IGetTicketStatusCountService } from "@/modules/ticket/services/contracts/get-status-count";
import type { IGetTicketStatusCountRepository } from "@/modules/ticket/repositories/contracts/get-status-count";
import type { TicketStatusCountDTO } from "@/modules/ticket/dtos/status-count";

@injectable()
export class GetTicketStatusCountService implements IGetTicketStatusCountService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketStatusCountRepository)
    private readonly getTicketStatusCountRepository: IGetTicketStatusCountRepository,
  ) {}

  async execute(): Promise<TicketStatusCountDTO[] | AppError> {
    const response = await this.getTicketStatusCountRepository.execute();

    return handleServiceResponse(response);
  }
}
