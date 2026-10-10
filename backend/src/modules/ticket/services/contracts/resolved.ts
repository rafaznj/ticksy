import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IResolvedTicketService {
  execute(id: string): Promise<TicketViewModel | null>;
}
