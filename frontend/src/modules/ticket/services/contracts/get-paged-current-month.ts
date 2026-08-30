import type { TicketPagedCurrentMonthDto } from "@/modules/ticket/dtos/paged-current-month.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";

export interface IGetTicketPagedCurrentMonthService {
  execute(params: PagedParamsQuery): Promise<PagedResponse<TicketPagedCurrentMonthDto> | AppError>;
}
