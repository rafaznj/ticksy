import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { CreateTicketDto } from "../../dtos/create.dto";

export type IGetTicketByIdService = IBaseGetByIdService<CreateTicketDto>;
