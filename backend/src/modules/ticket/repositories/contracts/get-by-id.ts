import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { CreateTicketDto } from "../../dto/create.dm";

export type IGetTicketByIdRepository = IBaseGetByIdRepository<CreateTicketDto>;
