import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketEntity {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdById: string;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;
}
