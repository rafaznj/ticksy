import { IBaseCreateService } from "../../../../shared/base/services/contracts/create";
import { CreateTicketData } from "../../data/create.data";
import { TicketViewModel } from "../../view-models/ticket.vm";

export interface ICreateTicketService extends IBaseCreateService<
  CreateTicketData,
  TicketViewModel
> {}
