import { TicketCategoryEnum } from "../enums/ticket-category.enum";
import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface TicketPagedLastSevenDaysModel {
  id: string;
  code: number;
  title: string;
  description: string;
  createdByName: string;
  status: TicketStatusEnum;
  priority: TicketPriorityEnum;
  category: TicketCategoryEnum;
  createdAt: Date;
  updatedAt: Date;
}
