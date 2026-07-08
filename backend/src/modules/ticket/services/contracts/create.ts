import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateTicketDto } from "../../dto/create.dm";

export type ICreateTicketService = IBaseCreateService<CreateTicketDto>;
