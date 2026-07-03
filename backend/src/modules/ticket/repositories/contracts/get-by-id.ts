import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { CreateTicketDto } from "../../dto/create.dm";

export interface IGetTicketByIdRepository extends IBaseGetByIdRepository<CreateTicketDto> {}
