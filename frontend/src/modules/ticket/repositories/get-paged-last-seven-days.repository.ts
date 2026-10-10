import { inject, injectable } from "inversify";

import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { IGetTicketPagedLastSevenDaysRepository } from "@/modules/ticket/repositories/contracts/get-paged-last-seven-days";
import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

@injectable()
export class GetTicketPagedLastSevenDaysRepository implements IGetTicketPagedLastSevenDaysRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<APIResponse<PagedResponse<TicketPagedLastSevenDaysDTO>> | AppError> {
    const response = await this.axiosSingleton.client.get<
      APIResponse<PagedResponse<TicketPagedLastSevenDaysDTO>>
    >(`${this.basePath}/get-paged-last-seven-days`, {
      params,
    });

    return handleRepositoryResponse(response);
  }
}
