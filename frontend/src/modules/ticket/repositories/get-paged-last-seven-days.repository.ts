import { inject, injectable } from "inversify";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { AppError } from "@/shared/errors/app-error";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IGetTicketPagedLastSevenDaysRepository } from "@/modules/ticket/repositories/contracts/get-paged-last-seven-days";
import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";

@injectable()
export class GetTicketPagedLastSevenDaysRepository implements IGetTicketPagedLastSevenDaysRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<PagedResponse<TicketPagedLastSevenDaysDTO> | AppError> {
    const response = await this.axiosSingleton.client.get<
      PagedResponse<TicketPagedLastSevenDaysDTO>
    >(`${this.basePath}/get-paged-last-seven-days`, {
      params,
    });

    return handleRepositoryResponse(response);
  }
}
