import type { TicketCategoryEnum } from "@/modules/ticket/enums/category.enum";
import type { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";
import type { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

export interface TicketPagedCurrentMonthDto {
  id: string;
  code: number;
  title: string;
  description: string;
  createdByName: string;
  status: TicketStatusEnum;
  priority: TicketPriorityEnum;
  category: TicketCategoryEnum;
  createdAt: string;
  updatedAt: string;
}
