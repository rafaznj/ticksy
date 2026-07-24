import type { IBaseGetByIdService } from "@/shared/base/services/contracts/get-by-id";
import type { TicketEntity } from "@/modules/ticket/mo/ticket.entity";

export type IGetTicketByIdService = IBaseGetByIdService<TicketEntity>;
