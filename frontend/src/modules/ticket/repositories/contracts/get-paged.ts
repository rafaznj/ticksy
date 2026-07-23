import type { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { PagedResponse } from "@/shared/types/paged-response";
import type { TicketEntity } from "../../../../../../backend/dist/src/modules/ticket/entity/ticket.entity";

export interface IGetTicketPagedRepository {
  execute(params: PagedParamsQuery): Promise<PagedResponse<TicketEntity> | AppError>;
}
