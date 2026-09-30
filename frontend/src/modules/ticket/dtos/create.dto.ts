import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import { TicketPriorityEnum } from "../enums/priority.enum";

export interface CreateTicketDto {
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  createdById: string;
}
