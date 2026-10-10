import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface IUnassignTicketService {
  execute(id: string): Promise<TicketDto | AppError>;
}
