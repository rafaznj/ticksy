import { TicketStatusEnum } from "../../enums/ticket-status.enum";
import { TicketModel } from "../../models/ticket";

export interface IChangeStatusTicketService {
  execute(id: string, status: TicketStatusEnum): Promise<TicketModel | null>;
}
