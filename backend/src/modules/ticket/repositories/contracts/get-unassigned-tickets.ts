import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IGetUnassignedTicketsRepository {
  execute(): Promise<TicketViewModel[]>;
}
