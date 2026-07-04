import { TicketStatusEnum } from "../enums/ticket-status.enum";
import { IChangeTicketStatusService } from "./contracts/change-status";

export class ChangeTicketStatusService implements IChangeTicketStatusService {
  execute(id: string, status: TicketStatusEnum): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
