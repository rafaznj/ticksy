import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketPagedModel {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdById: string;
  createdByName: string;
  assignedToId: string | null;
  assignedToName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
