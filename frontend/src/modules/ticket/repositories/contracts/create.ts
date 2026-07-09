import type { CreateTicketDto } from "@/modules/ticket/dto/create.dto";
import type { Ticket } from "@/modules/ticket/entity/ticket.entity";
import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";

export type ICreateTicketRepository = IBaseCreateRepository<CreateTicketDto, Ticket>;
