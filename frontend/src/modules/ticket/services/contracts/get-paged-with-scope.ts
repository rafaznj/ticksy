import type { TicketPagedDto } from "@/modules/ticket/dtos/paged.dto";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

export interface IGetTicketPagedWithScopeService extends IBaseGetPagedService<TicketPagedDto> {}
