import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";

export interface IGetTicketByIdService extends IBaseGetByIdService<TicketDto> {}
