import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { AppError } from "@/shared/errors/app-error";
import type { IGetTicketStatusCountService } from "@/modules/ticket/services/contracts/get-status-count";
import type { IGetTicketStatusCountRepository } from "@/modules/ticket/repositories/contracts/get-status-count";
import type { StatusCountDTO } from "@/modules/ticket/dtos/status-count";

@injectable()
export class GetTicketStatusCountService implements IGetTicketStatusCountService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketStatusCountRepository)
    private readonly getTicketStatusCountRepository: IGetTicketStatusCountRepository,
  ) {}

  async execute(): Promise<StatusCountDTO[] | AppError> {
    const response = await this.getTicketStatusCountRepository.execute();

    return handleServiceResponse(response);
  }
}
