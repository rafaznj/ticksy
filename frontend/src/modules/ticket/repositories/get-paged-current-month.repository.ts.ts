import { inject, injectable } from "inversify";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IGetTicketPagedCurrentMonthRepository } from "@/modules/ticket/repositories/contracts/get-paged-current-month";
import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";

@injectable()
export class GetTicketPagedCurrentMonthRepository implements IGetTicketPagedCurrentMonthRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<PagedResponse<TicketPagedCurrentMonthDto> | AppError> {
    const response = await this.axiosSingleton.client.get<
      PagedResponse<TicketPagedCurrentMonthDto>
    >("ticket/get-paged-current-month", {
      params,
    });

    return handleRepositoryResponse(response);
  }
}
