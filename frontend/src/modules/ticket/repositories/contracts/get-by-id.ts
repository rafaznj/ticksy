import type { TicketEntity } from "@/modules/ticket/mo/ticket.entity";
import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<TicketEntity>;
