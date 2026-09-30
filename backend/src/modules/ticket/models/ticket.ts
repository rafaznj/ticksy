import { TicketCategoryEnum } from "../enums/ticket-category.enum";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketModel {
  id: string;
  code: number;
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdById: string;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
