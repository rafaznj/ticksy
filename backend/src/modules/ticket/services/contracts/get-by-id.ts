import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { CreateTicketDto } from "../../dto/create.dto";

export type IGetTicketByIdService = IBaseGetByIdService<CreateTicketDto>;
