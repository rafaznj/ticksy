import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketPagedModel {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdByName: string;
  assignedToName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
