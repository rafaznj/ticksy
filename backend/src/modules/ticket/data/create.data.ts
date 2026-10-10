import { TicketPriorityEnum } from "../enums/ticket-priority.enum";
import { TicketCategoryEnum } from "../enums/ticket-category.enum";

export interface CreateTicketData {
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  createdById: string;
}
