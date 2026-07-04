import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { Ticket } from "../../entity/ticket.entity";

export type ICreateTicketRepository = IBaseCreateRepository<Ticket>;
