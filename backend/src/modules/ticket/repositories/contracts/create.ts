import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { Ticket } from "../../entity/ticket.entity";

export interface ICreateTicketRepository extends IBaseCreateRepository<Ticket> {}
