import type { CreateTicketDto } from "@/modules/ticket/dtos/create.dto";
import type { TicketEntity } from "@/modules/ticket/mo/ticket.entity";
import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";

export type ICreateTicketRepository = IBaseCreateRepository<CreateTicketDto, TicketEntity>;
