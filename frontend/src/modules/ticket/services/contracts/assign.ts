import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { AppError } from "@/shared/errors/app-error";

export interface IAssignTicketService {
  execute(id: string, userId: string): Promise<TicketEntity | AppError>;
}
