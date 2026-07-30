import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export interface EditTicketFormProps {
  title?: string;
  description?: string;
  priority?: TicketPriorityEnum;
}
