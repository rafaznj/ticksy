import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { CreateTicketDto } from "../../dto/create.dm";

export type IGetTicketByIdService = IBaseGetByIdService<CreateTicketDto>;
