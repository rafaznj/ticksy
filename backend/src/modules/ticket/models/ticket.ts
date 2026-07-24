import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketModel {
  title: string;
  description: string;
  createdAt: Date;
  id: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  updatedAt: Date;
  createdById: string;
  assignedToId: string | null;
}
