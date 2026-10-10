import type { TicketStatusCountDTO } from "@/modules/ticket/dtos/status-count";
import type { AppError } from "@/shared/errors/app-error";
import type { APIResponse } from "@/shared/interfaces/api-response";

export interface IGetTicketStatusCountRepository {
  execute(): Promise<APIResponse<TicketStatusCountDTO[]> | AppError>;
}
