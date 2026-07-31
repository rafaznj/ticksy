import { TicketModel } from "../../models/ticket";

export interface IAssignTicketRepository {
  execute(id: string, userId: string): Promise<TicketModel | null>;
}
