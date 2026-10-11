import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IGetTicketByIdService extends IBaseGetByIdService<TicketViewModel> {}
