import { IBaseGetByIdRepository } from "../../../../shared/base/repositories/contracts/get-by-id";
import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IGetTicketByIdRepository extends IBaseGetByIdRepository<TicketViewModel> {}
