import { inject, injectable } from "inversify";
import type { IGetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/contracts/get-paged-with-scope";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import { handleRepositoryResponse } from "@/shared/interfaces/handle-repository-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

@injectable()
export class GetTicketPagedWithScopeRepository implements IGetTicketPagedWithScopeRepository {
  private readonly basePath = "ticket";

  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<APIResponse<PagedResponse<TicketPagedDto>> | AppError> {
    const response = await this.axiosSingleton.client.get<
      APIResponse<PagedResponse<TicketPagedDto>>
    >(`${this.basePath}/get-paged-with-scope`, {
      params,
    });

    return handleRepositoryResponse(response);
  }
}
