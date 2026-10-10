import { TicketStatusEnum } from "../enums/status.enum";
import type { CreateTicketData } from "@/modules/ticket/data/create.data";

export interface UpdateTicketData extends Partial<CreateTicketData> {
  status?: TicketStatusEnum;
  assignedToId?: string | null;
}
