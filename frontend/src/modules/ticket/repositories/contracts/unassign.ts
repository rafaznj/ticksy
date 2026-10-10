import type { TicketDto } from "@/modules/ticket/dtos/ticket.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IUnassignTicketRepository {
  execute(id: string): Promise<APIResponse<TicketDto> | AppError>;
}
