import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

export interface IGetTicketPagedService {
  execute(params: PagedParamsQuery): Promise<PagedResponse<TicketPagedDto> | AppError>;
}
