import { TicketModel } from "../../models/ticket";

export interface IUnassignTicketService {
  execute(id: string): Promise<TicketModel | null>;
}
