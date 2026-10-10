import type { TicketPagedLastSevenDaysDTO } from "@/modules/ticket/dtos/paged-last-seven-day";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

export interface IGetTicketPagedLastSevenDaysService extends IBaseGetPagedService<TicketPagedLastSevenDaysDTO> {}
