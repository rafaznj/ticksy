import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateTicketDto } from "../../dto/create.dto";
import { TicketEntity } from "../../entity/ticket.entity";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto, TicketEntity>;
