import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import type { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

export interface TicketPagedDto {
  id: string;
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdById: string;
  createdByName: string;
  assignedToId: string | null;
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
}
