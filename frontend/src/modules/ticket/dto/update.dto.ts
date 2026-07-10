import type { CreateTicketDto } from "@/modules/ticket/dto/create.dto";
import { TicketStatusEnum } from "../enums/ticket-status.enum";

export interface UpdateTicketDto extends Partial<CreateTicketDto> {
  status?: TicketStatusEnum;
  assignedToId?: string | null;
}
