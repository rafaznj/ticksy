import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { AppError } from "@/shared/errors/app-error";

export interface IUnassignTicketService {
  execute(id: string): Promise<TicketEntity | AppError>;
}
