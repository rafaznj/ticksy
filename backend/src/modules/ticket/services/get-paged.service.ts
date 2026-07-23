import { Inject } from "@nestjs/common";
import { REPOSITORY_TOKENS } from "../../../shared/di/tokens.repositories";
import { IQueryOptions } from "../../../shared/types/query-options";
import { IPagedResult } from "../../../shared/types/paged-result";
import { IGetTicketPagedService } from "./contracts/get-paged";
import { TicketEntity } from "../entity/ticket.entity";
import type { IGetTicketPagedRepository } from "../repositories/contracts/get-paged";

// TODO: Create paged service
export class GetTicketPagedService implements IGetTicketPagedService {
  constructor(
    @Inject(REPOSITORY_TOKENS.GetTicketPagedRepository)
    private getTicketPagedRepository: IGetTicketPagedRepository,
  ) {}

  async execute(options: IQueryOptions): Promise<IPagedResult<TicketEntity>> {
    const response = await this.getTicketPagedRepository.execute({
      ...options,
      columnsComparison: ["name", "email"], // TODO: Alter Columns
      softDeleteFilter: true,
    });
    return response;
  }
}
