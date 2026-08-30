import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import type { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

export interface TicketPagedCurrentMonthDto {
  id: string;
  title: string;
  createdByName: string;
  priority: TicketPriorityEnum;
  status: TicketStatusEnum;
  createdAt: string;
  updatedAt: string;
}
