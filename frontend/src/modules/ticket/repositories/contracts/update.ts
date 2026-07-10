import type { UpdateTicketDto } from "@/modules/ticket/dto/update.dto";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IBaseUpdateRepository } from "@/shared/base/repositories/contracts/update";

export type IUpdateTicketRepository = IBaseUpdateRepository<UpdateTicketDto, Ticket>;
