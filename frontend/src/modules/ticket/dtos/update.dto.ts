import type { CreateTicketDto } from "@/modules/ticket/dtos/create.dto";
import { TicketStatusEnum } from "../enums/status.enum";

export interface UpdateTicketDto extends Partial<CreateTicketDto> {
  status?: TicketStatusEnum;
  assignedToId?: string | null;
}
