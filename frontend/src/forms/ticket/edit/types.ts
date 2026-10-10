import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export interface EditTicketFormProps {
  title?: string;
  description?: string;
  category?: TicketCategoryEnum;
  priority?: TicketPriorityEnum;
}
