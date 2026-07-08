import { TicketStatusEnum } from "../../enums/ticket-status.enum";

export interface IChangeTicketStatusService {
  execute(id: string, status: TicketStatusEnum): Promise<void>;
}
