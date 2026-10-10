import type { CreateTicketData } from "@/modules/ticket/data/create.data";
import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { IBaseCreateRepository } from "@/shared/base/repositories/contracts/create";

export interface ICreateTicketRepository extends IBaseCreateRepository<
  CreateTicketData,
  TicketDto
> {}
