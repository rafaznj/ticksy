import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import { TicketPriorityEnum } from "../enums/priority.enum";

export interface CreateTicketData {
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  createdById: string;
}
