import { IBaseCreateRepository } from "../../../../shared/base/repositories/contracts/create";
import { CreateTicketDto } from "../../dtos/create.dto";
import { TicketModel } from "../../models/ticket";

export type ICreateTicketRepository = IBaseCreateRepository<CreateTicketDto, TicketModel>;
