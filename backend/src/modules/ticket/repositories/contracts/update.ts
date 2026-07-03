import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateTicketDto } from "../../dto/update.dm";

export interface IUpdateTicketRepository extends IBaseUpdateRepository<UpdateTicketDto> {}
