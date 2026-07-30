import { TicketPriorityEnum } from "../enums/priority.enum";
import { TicketStatusEnum } from "../enums/status.enum";

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
