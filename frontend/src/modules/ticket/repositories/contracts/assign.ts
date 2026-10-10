import type { TicketAssignDto } from "@/modules/ticket/dtos/assign.dto";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IAssignTicketRepository {
  execute(id: string, userId: string): Promise<APIResponse<TicketAssignDto> | AppError>;
}
