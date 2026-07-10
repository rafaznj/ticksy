import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IBaseGetByIdRepository } from "@/shared/base/repositories/contracts/get-by-id";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<Ticket>;
