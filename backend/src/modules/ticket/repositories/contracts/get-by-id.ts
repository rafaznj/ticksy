import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { CreateTicketDto } from "../../dto/create.dto";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<CreateTicketDto>;
