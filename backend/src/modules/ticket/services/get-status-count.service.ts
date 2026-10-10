import { Inject } from "@nestjs/common";
import { TicketStatusCountViewModel } from "../view-models/status-count.vm";
import type { IGetTicketStatusCountRepository } from "../repositories/contracts/get-status-count";
import { IGetTicketStatusCountService } from "./contracts/get-status-count";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";

export class GetTicketStatusCountService implements IGetTicketStatusCountService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketStatusCountRepository)
    private readonly getStatusCountRepository: IGetTicketStatusCountRepository,
  ) {}

  async execute(): Promise<TicketStatusCountViewModel[]> {
    return this.getStatusCountRepository.execute();
  }
}
