import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export interface CreateTicketFormProps {
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  createdById: string;
}
