import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";

export type IGetTicketByIdService = IBaseGetByIdService<Ticket>;
