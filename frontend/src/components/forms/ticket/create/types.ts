import type { TicketPriorityEnum } from "@/modules/ticket/enums/ticket-priority.enum";

export interface CreateTicketFormProps {
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  createdById: string;
}
