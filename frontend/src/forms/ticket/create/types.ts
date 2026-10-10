import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export interface CreateTicketFormProps {
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  createdById: string;
}
