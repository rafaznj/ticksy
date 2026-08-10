import { TicketModel } from "../../models/ticket";

export interface IResolvedTicketService {
  execute(id: string): Promise<TicketModel | null>;
}
