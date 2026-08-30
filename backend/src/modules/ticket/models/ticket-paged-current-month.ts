import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketPagedCurrentMonthModel {
  id: string;
  title: string;
  createdByName: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
