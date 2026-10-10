import type { TicketAssignDto } from "@/modules/ticket/dtos/assign.dto";
import type { AppError } from "@/shared/errors/app-error";

export interface IAssignTicketService {
  execute(id: string, userId: string): Promise<TicketAssignDto | AppError>;
}
