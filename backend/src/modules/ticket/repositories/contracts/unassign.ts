import { TicketModel } from "../../models/ticket";

export interface IUnassignTicketRepository {
  execute(id: string): Promise<TicketModel | null>;
}
