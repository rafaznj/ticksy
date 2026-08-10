import { TicketModel } from "../../models/ticket";

export interface IResolvedTicketRepository {
  execute(id: string): Promise<TicketModel | null>;
}
