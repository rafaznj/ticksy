import { TicketViewModel } from "../../view-models/ticket.vm";

export interface IUnassignTicketService {
  execute(id: string): Promise<TicketViewModel | null>;
}
