import { TicketModel } from "../../models/ticket";

export interface IAssignTicketService {
  execute(id: string, userId: string): Promise<TicketModel | null>;
}
