import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";
import type { PagedParamsQuery } from "@/components/tables/shared/interfaces/paged-params-query";
import type { PagedResponse } from "@/components/tables/shared/interfaces/paged-response";

export interface IGetTicketPagedLastSevenDaysRepository {
  execute(
    params: PagedParamsQuery,
  ): Promise<APIResponse<PagedResponse<TicketPagedLastSevenDaysDTO>> | AppError>;
}
