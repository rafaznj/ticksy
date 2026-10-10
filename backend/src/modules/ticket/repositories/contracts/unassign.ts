import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IUnassignTicketRepository {
  execute(id: string): Promise<TicketViewModel | null>;
}
