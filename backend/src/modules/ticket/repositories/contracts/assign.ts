import { TicketAssignViewModel } from "../../view-models/assign.vm";

export interface IAssignTicketRepository {
  execute(id: string, userId: string): Promise<TicketAssignViewModel | null>;
}
