import type { IBaseCreateService } from "@/shared/base/services/contracts/create";
import type { TicketDto } from "../../dtos/ticket.dto";
import type { CreateTicketData } from "@/modules/ticket/data/create.data";

export interface ICreateTicketService extends IBaseCreateService<CreateTicketData, TicketDto> {}
