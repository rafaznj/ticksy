import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import type { IGetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/contracts/get-paged-with-scope";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { AppError } from "@/shared/errors/app-error";
import { handleServiceResponse } from "@/shared/interfaces/handle-service-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

@injectable()
export class GetTicketPagedWithScopeService implements IGetTicketPagedWithScopeService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository)
    private readonly getTicketPagedWithScopeRepository: IGetTicketPagedWithScopeRepository,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<TicketDto> | AppError> {
    const response = await this.getTicketPagedWithScopeRepository.execute(params);

    return handleServiceResponse(response);
  }
}
