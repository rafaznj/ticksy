import { IBaseUpdateRepository } from "../../../../shared/base/repositories/contracts/update";
import { UpdateTicketDto } from "../../dtos/update.dto";

export interface IUpdateTicketRepository extends IBaseUpdateRepository<UpdateTicketDto> {}
