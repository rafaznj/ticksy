import { IBaseGetByIdService } from "../../../../shared/base/services/contracts/get-by-id";
import { TicketViewModel } from "../../view-models/ticket.vm";

export type IGetTicketByIdService = IBaseGetByIdService<TicketViewModel>;
