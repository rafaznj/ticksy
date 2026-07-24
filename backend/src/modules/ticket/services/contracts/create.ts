import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateTicketDto } from "../../dtos/create.dto";
import { TicketModel } from "../../models/ticket";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto, TicketModel>;
