import type { TicketPriorityEnum } from "@/modules/ticket/enums/ticket-priority.enum";
import type { TicketStatusEnum } from "@/modules/ticket/enums/ticket-status.enum";

export interface TicketPagedDto {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdByName: string;
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
}
