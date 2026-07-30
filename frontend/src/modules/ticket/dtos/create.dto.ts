import { TicketPriorityEnum } from "../enums/priority.enum";

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: TicketPriorityEnum;
  createdById: string;
}
