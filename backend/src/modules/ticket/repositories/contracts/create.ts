import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateTicketDto } from "../../dtos/create.dto";
import { TicketViewModel } from "../../view-models/ticket.vm";

export type ICreateTicketRepository = IBaseCreateRepository<CreateTicketDto, TicketViewModel>;
