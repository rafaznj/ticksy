import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";
import type { IGetTicketPagedCurrentMonthService } from "@/modules/ticket/services/contracts/get-paged-current-month";
import type { IGetTicketPagedCurrentMonthRepository } from "@/modules/ticket/repositories/contracts/get-paged-current-month";

@injectable()
export class GetTicketPagedCurrentMonthService implements IGetTicketPagedCurrentMonthService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedCurrentMonthRepository)
    private readonly getTicketPagedCurrentMonthRepository: IGetTicketPagedCurrentMonthRepository,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<PagedResponse<TicketPagedCurrentMonthDto> | AppError> {
    const response = await this.getTicketPagedCurrentMonthRepository.execute(params);

    return handleServiceResponse(response);
  }
}
