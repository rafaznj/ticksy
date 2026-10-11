import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateTicketDto } from "../../dtos/create.dto";
import { TicketViewModel } from "../../view-models/ticket.vm";

export interface ICreateTicketRepository extends IBaseCreateRepository<
  CreateTicketDto,
  TicketViewModel
> {}
