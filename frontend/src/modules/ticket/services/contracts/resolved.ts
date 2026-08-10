import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { AppError } from "@/shared/errors/app-error";

export interface IResolvedTicketService {
  execute(id: string): Promise<TicketEntity | AppError>;
}
