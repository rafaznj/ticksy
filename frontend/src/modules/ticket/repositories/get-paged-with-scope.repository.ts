import { inject, injectable } from "inversify";
import type { IGetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/contracts/get-paged-with-scope";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { AppError } from "@/shared/errors/app-error";
import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import { handleRepositoryResponse } from "@/shared/response/handle-repository-response";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import type { AxiosSingleton } from "@/lib/axios/axios-singleton";

@injectable()
export class GetTicketPagedWithScopeRepository implements IGetTicketPagedWithScopeRepository {
  constructor(
    @inject(INFRASTRUCTURE_TOKENS.AxiosSingleton)
    private axiosSingleton: AxiosSingleton,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<TicketPagedDto> | AppError> {
    const response = await this.axiosSingleton.client.get<PagedResponse<TicketPagedDto>>(
      "ticket/get-paged-with-scope",
      {
        params,
      },
    );

    return handleRepositoryResponse(response);
  }
}
