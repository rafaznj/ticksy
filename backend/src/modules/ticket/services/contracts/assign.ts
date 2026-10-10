import { TicketAssignViewModel } from "../../view-models/assign.vm";

export interface IAssignTicketService {
  execute(id: string, userId: string): Promise<TicketAssignViewModel | null>;
}
