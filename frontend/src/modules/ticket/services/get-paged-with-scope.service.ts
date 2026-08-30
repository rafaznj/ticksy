import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import type { IGetTicketPagedWithScopeRepository } from "@/modules/ticket/repositories/contracts/get-paged-with-scope";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { AppError } from "@/shared/errors/app-error";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

@injectable()
export class GetTicketPagedWithScopeService implements IGetTicketPagedWithScopeService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedWithScopeRepository)
    private readonly getTicketPagedWithScopeRepository: IGetTicketPagedWithScopeRepository,
  ) {}

  async execute(params: PagedParamsQuery): Promise<PagedResponse<TicketEntity> | AppError> {
    const response = await this.getTicketPagedWithScopeRepository.execute(params);

    return handleServiceResponse(response);
  }
}
