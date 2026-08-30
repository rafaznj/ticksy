import { Inject } from "@nestjs/common";
import type { IGetTicketPagedCurrentMonthRepository } from "../repositories/contracts/get-paged-current-month";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { TicketPagedCurrentMonthModel } from "../models/ticket-paged-current-month";
import { IGetTicketPagedCurrentMonthService } from "./contracts/get-paged-tickets-current-month";

export class GetTicketPagedCurrentMonthService implements IGetTicketPagedCurrentMonthService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedCurrentMonthRepository)
    private readonly getTicketPagedCurrentMonthRepository: IGetTicketPagedCurrentMonthRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketPagedCurrentMonthModel>> {
    return this.getTicketPagedCurrentMonthRepository.execute({
      ...options,
      columnsComparison: ["createdByName", "title"],
      softDeleteFilter: true,
    });
  }
}
