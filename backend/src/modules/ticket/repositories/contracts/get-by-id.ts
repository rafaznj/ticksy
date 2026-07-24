import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { CreateTicketDto } from "../../dtos/create.dto";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<CreateTicketDto>;
