import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IResolvedTicketRepository {
  execute(id: string): Promise<TicketViewModel | null>;
}
