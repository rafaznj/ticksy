import { TicketPriorityEnum } from "../enums/ticket-priority.enum";

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  createdById: string;
}
