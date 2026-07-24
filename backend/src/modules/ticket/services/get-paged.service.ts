import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IGetTicketPagedService } from "./contracts/get-paged";
import type { IGetTicketPagedRepository } from "../repositories/contracts/get-paged";
import { TicketPagedModel } from "../models/ticket-paged";

export class GetTicketPagedService implements IGetTicketPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedRepository)
    private getTicketPagedRepository: IGetTicketPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedModel>> {
    const response = await this.getTicketPagedRepository.execute({
      ...options,
      columnsComparison: ["title", "description"],
      softDeleteFilter: true,
    });
    return response;
  }
}
