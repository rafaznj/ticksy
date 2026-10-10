import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import type { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

export interface TicketDto {
  id: string;
  code: number;
  title: string;
  description: string;
  category: TicketCategoryEnum;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdById: string;
  createdByName: string;
  assignedToId: string | null;
  assignedToName: string | null;
  createdAt: string;
  updatedAt: string;
}
