import { REPOSITORY_TOKENS } from "@/shared/di/tokens.repositories";
import { inject, injectable } from "inversify";
import { handleServiceResponse } from "@/shared/response/handle-service-response";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import type { IGetTicketPagedLastSevenDaysService } from "@/modules/ticket/services/contracts/get-paged-last-seven-days";
import type { IGetTicketPagedLastSevenDaysRepository } from "@/modules/ticket/repositories/contracts/get-paged-last-seven-days";

@injectable()
export class GetTicketPagedLastSevenDaysService implements IGetTicketPagedLastSevenDaysService {
  constructor(
    @inject(REPOSITORY_TOKENS.GetTicketPagedLastSevenDaysRepository)
    private readonly getTicketPagedLastSevenDaysRepository: IGetTicketPagedLastSevenDaysRepository,
  ) {}

  async execute(
    params: PagedParamsQuery,
  ): Promise<PagedResponse<TicketPagedLastSevenDaysDTO> | AppError> {
    const response = await this.getTicketPagedLastSevenDaysRepository.execute(params);

    return handleServiceResponse(response);
  }
}
