import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface IGetTicketPagedWithScopeRepository {
  execute(params: PagedParamsQuery): Promise<APIResponse<PagedResponse<TicketPagedDto>> | AppError>;
}
