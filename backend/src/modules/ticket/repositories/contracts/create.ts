import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateTicketDto } from "../../dto/create.dto";
import { TicketEntity } from "../../entity/ticket.entity";

export type ICreateTicketRepository = IBaseCreateRepository<CreateTicketDto, TicketEntity>;
